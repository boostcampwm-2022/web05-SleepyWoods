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
      .emit('userCreated', this.getRoomUserData(roomName + ''));
  }

  public handleDisconnect(client: Socket): void {
    this.server.emit('userLeaved', client['userData']['nickname']);
    this.socketIdByUser.delete(client['userData']['id']);
    console.log(this.socketIdByUser.entries());
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

  @SubscribeMessage('chat')
  handleMessage(client: any, payload: any): void {
    const msgPayload = {
      fromUserId: client['userData']['id'],
      timestamp: Date.now(),
      message: payload['message'] || '',
    };

    client.to(client['userData']['roomName']).emit('chat', msgPayload);
  }

  @SubscribeMessage('directMessage')
  handleDirectMessage(client: any, payload: any): void {
    const targetUserId = payload['targetUserId'];

    const msgPayload = {
      fromUserId: client['userData']['id'],
      timestamp: Date.now(),
      message: payload['message'] || '',
    };

    this.event.emit('saveChat', { ...msgPayload, targetUserId });

    client
      .to(this.socketIdByUser.get(targetUserId))
      .emit('directMessage', msgPayload);
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
    console.log(client['userData']['id'], 'disconnecting...');
    client.disconnect();
  }
}
