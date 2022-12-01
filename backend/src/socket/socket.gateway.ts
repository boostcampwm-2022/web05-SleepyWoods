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

@UseFilters(WsExceptionFilter)
@WebSocketGateway({
  pingInterval: 5000,
  pingTimeout: 3000,
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  socketIdByUser = new Map();

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
    if (!userData || !roomName || this.socketIdByUser.get(userData['id'])) {
      client.disconnect();
      return;
    }

    client['userData'] = {
      ...userData,
      x: -25,
      y: 400,
      direction: 'right',
      state: 'wait',
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
    this.socketIdByUser.delete(client['userData']['id']);
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
    client['userData'] = { ...client['userData'], ...payload };
    client.to(client['userData']['roomName']).emit('move', client['userData']);
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
    console.log(payload);
    const targetUserId = payload['targetUserId'];

    const msgPayload = {
      fromUserId: client['userData']['id'],
      nickname: client['userData']['nickname'],
      timestamp: Date.now(),
      message: payload['message'] || '',
    };
    console.log({ ...msgPayload, targetUserId });
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

  @SubscribeMessage('disconnecting')
  handleDisconnecting(client: any) {
    client.disconnect();
  }
}
