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

@UseFilters(WsExceptionFilter)
@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly authService: AuthService) {}

  public getRoomUserData(roomName: string) {
    const roomUser = [];
    this.server.sockets.adapter.rooms.get(roomName).forEach(e => {
      roomUser.push(this.server.sockets.sockets.get(e)['userData']);
    });

    return roomUser;
  }

  public handleConnection(client: Socket): void {
    const key = client.handshake.headers.authorization;
    const roomName = client.handshake.headers.room.toString();
    const userData = this.authService.verify(key);
    if (!userData || !roomName) {
      client.disconnect();
      return;
    }

    client['userData'] = {
      ...userData,
      x: -25,
      y: 400,
      socketId: client.id,
      direction: 'right',
      state: 'walk',
      roomName,
    };

    client.join(roomName);
    client.to(roomName).emit('userCreated', client['userData']);
    this.server
      .to(client.id)
      .emit('userCreated', this.getRoomUserData(roomName));
  }

  public handleDisconnect(client: Socket): void {
    this.server.emit('userLeaved', client['userData']['id']);
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

  // 전체채팅
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
    const targetSockeitId = payload['targetSocketId'];

    const msgPayload = {
      fromUserId: client['userData']['id'],
      timestamp: Date.now(),
      message: payload['message'] || '',
    };
    client.to(targetSockeitId).emit('directMessage', msgPayload);
  }
}
