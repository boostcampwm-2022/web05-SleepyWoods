import { UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { playerMovementDataDto } from './dto/player.dto';
import { WsExceptionFilter } from './filter/ws.filter';
import { movementValidationPipe } from './pipes/movement.pipe';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { signupDataDto } from 'src/auth/dto/user-data.dto';
import {
  Cron,
  CronExpression,
  Interval,
  SchedulerRegistry,
  Timeout,
} from '@nestjs/schedule';

@UseFilters(WsExceptionFilter)
@WebSocketGateway({
  pingInterval: 5000,
  pingTimeout: 3000,
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  socketIdByUser = new Map();
  walkCountByUser = new Map();

  constructor(
    private readonly authService: AuthService,
    private event: EventEmitter2
  ) {}

  public getRoomUserData(roomName: string) {
    const roomUser = [];
    this.server.sockets.adapter.rooms.get(roomName).forEach(e => {
      roomUser.push(this.server.sockets.sockets.get(e)['userData']);
    });

    return roomUser;
  }

  public handleConnection(client: Socket): void {
    const key = client.handshake?.headers?.authorization;
    const roomName = client.handshake?.headers?.room;
    const userData = this.authService.verify(key);
    if (!userData || !roomName) {
      client.disconnect();
      return;
    }

    if (this.socketIdByUser.get(userData['id'])) {
      this.server.sockets.sockets
        .get(this.socketIdByUser.get(userData['id']))
        .disconnect();
    }

    client['userData'] = {
      ...userData,
      x: -25,
      y: 400,
      direction: 'right',
      state: 'wait',
      userState: 'on',
      walk: this.walkCountByUser.get(userData['id']) || 0,
      roomName,
    };

    this.socketIdByUser.set(userData['id'], client.id);
    client.join(roomName);
    client.to(roomName).emit('userCreated', client['userData']);
    this.server
      .to(client.id)
      .emit('userInitiated', this.getRoomUserData(roomName + ''));
  }

  public handleDisconnect(client: Socket): void {
    this.server.emit('userLeaved', client['userData']);
    this.event.emit('walkSave', client['userData']);
    this.socketIdByUser.delete(client['userData']['id']);
  }

  @Cron('58 23 * * *', { name: 'walkSaveScheduler' })
  walkSaveScheduler() {
    this.event.emit('saveWalkCount', [...this.walkCountByUser]);
    this.walkCountByUser.clear();
  }

  @SubscribeMessage('userDataChanged')
  handleUserDataChanged(
    @ConnectedSocket() client: any,
    @MessageBody(ValidationPipe) payload: signupDataDto
  ) {
    client['userData'] = { ...client['userData'], ...payload };
    client
      .to(client['userData']['roomName'])
      .emit('userDataChanged', client['userData']);
  }

  @UsePipes(new ValidationPipe())
  @SubscribeMessage('move')
  handleMove(
    @ConnectedSocket() client: any,
    @MessageBody(movementValidationPipe)
    payload: playerMovementDataDto
  ) {
    this.walkCountByUser.set(
      client['userData']['id'],
      (this.walkCountByUser.get(client['userData']['id']) ?? 0) + 1
    );
    client['userData']['walk'] = Math.floor(
      this.walkCountByUser.get(client['userData']['id']) / 10
    );
    client['userData'] = { ...client['userData'], ...payload };
    this.server
      .to(client['userData']['roomName'])
      .emit('move', client['userData']);
  }

  @SubscribeMessage('publicChat')
  handleMessage(client: any, payload: any): void {
    const msgPayload = {
      fromUserId: client['userData']['id'],
      nickname: client['userData']['nickname'],
      timestamp: Date.now(),
      message: payload['message'] || '',
    };

    client.to(client['userData']['roomName']).emit('publicChat', msgPayload);
  }

  @SubscribeMessage('privateChat')
  handleDirectMessage(client: any, payload: any): void {
    const targetUserId = payload['targetUserId'];

    const msgPayload = {
      fromUserId: client['userData']['id'],
      nickname: client['userData']['nickname'],
      timestamp: Date.now(),
      message: payload['message'] || '',
    };
    this.event.emit('saveChat', { ...msgPayload, targetUserId });

    client
      .to(this.socketIdByUser.get(targetUserId))
      .emit('privateChat', msgPayload);
  }

  @SubscribeMessage('chatRoomEntered')
  handleChatRoomEntered(client: any, payload: any) {
    this.event.emit('createChatRoom', {
      fromUserId: client['userData']['id'],
      ...payload,
    });
  }

  @SubscribeMessage('chatRoomLeaved')
  handleChatRoomLeaved(client: any, payload: any) {
    this.event.emit('leaveChatRoom', {
      fromUserId: client['userData']['id'],
      ...payload,
    });
  }

  @SubscribeMessage('callRequested')
  handleCallRequested(client: any, payload: any) {
    const { calleeUserId } = payload;
    const callerUserId = client['userData']['id'];
    // busy 로 상태 변경
    client['userData']['userState'] = 'busy';
    this.server.sockets.sockets.get(this.socketIdByUser.get(calleeUserId))[
      'userData'
    ]['userState'] = 'busy';

    this.server
      .to(this.socketIdByUser.get(calleeUserId))
      .emit('callRequested', {
        callerUserId: client['userData']['id'],
      });

    this.server.to(client['userData']['roomName']).emit('userStateChanged', {
      userIdList: [calleeUserId, callerUserId],
      userState: 'busy',
    });
  }

  // 건 사람이 마음 바뀜 끊음. => 상대방만 on으로 변경
  @SubscribeMessage('callCanceled')
  handleCallCanceled(client: any, payload: any) {
    const { calleeUserId } = payload;
    const callerUserId = client['userData']['id'];

    this.server.sockets.sockets.get(this.socketIdByUser.get(calleeUserId))[
      'userData'
    ]['userState'] = 'on';

    this.server.to(this.socketIdByUser.get(calleeUserId)).emit('callCanceled', {
      callerUserId: client['userData']['id'],
    });

    this.server.to(client['userData']['roomName']).emit('userStateChanged', {
      userIdList: [calleeUserId],
      userState: 'on',
    });
  }

  @SubscribeMessage('callDenied')
  handleCallDenied(client: any, payload: any) {
    const { callerUserId } = payload;
    const calleeUserId = client['userData']['id'];

    client['userData']['userState'] = 'on';

    this.server.to(this.socketIdByUser.get(callerUserId)).emit('callDenied', {
      calleeUserId: client['userData']['id'],
    });

    this.server.to(client['userData']['roomName']).emit('userStateChanged', {
      userIdList: [calleeUserId],
      userState: 'on',
    });
  }

  // 전화 수락!!
  @SubscribeMessage('callEntered')
  handleCallEntered(client: any, payload: any) {
    const { callerUserId } = payload;
    const calleeUserId = client['userData']['id'];

    client['userData']['userState'] = 'busy';
    this.server.sockets.sockets.get(this.socketIdByUser.get(calleeUserId))[
      'userData'
    ]['userState'] = 'busy';

    this.server.to(this.socketIdByUser.get(callerUserId)).emit('callEntered', {
      calleeUserId: client['userData']['id'],
    });

    this.server.to(client['userData']['roomName']).emit('userStateChanged', {
      userIdList: [callerUserId, calleeUserId],
      userState: 'busy',
    });
    // webRTC 연결 맺애주는 과정 필요
    // 기존에 그룹에 통화하고잇던 리스트를 받아서 userData어딘가에 갖고있어야할듯?
    // 내가 아무도없는 상태에서 너한테 거는거랑 ( 진짜로 webRTC룸이 첫 생성)
    // 내가 누군가랑 하다가 너까지 끌어들이는 시점 (룸이 잇는데 너를 끌어드림)
    // 프론트에서 저장하고잇다가 request할떄 같이 참여자들 리스트?
  }
  // 전화 나오기!

  @SubscribeMessage('callLeaved')
  handleCallLeaved(client: any, payload: any) {
    const leavingUserId = client['userData']['id'];
    const { callingUserList } = payload;

    this.server.to(callingUserList).emit('callLeaved', {
      leavingUserId,
    });

    this.server.to(client['userData']['roomName']).emit('userStateChanged', {
      userIdList: [leavingUserId],
      userState: 'on',
    });
  }

  @SubscribeMessage('disconnecting')
  handleDisconnecting(client: any) {
    client.disconnect();
  }
}
