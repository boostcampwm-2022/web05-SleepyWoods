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

  // 입장 햇을 시

  public getRoomUserData(roomName) {
    const roomUser = [];
    this.server.sockets.adapter.rooms.get(roomName).forEach(e => {
      roomUser.push(this.server.sockets.sockets.get(e)['userData']);
    });

    return roomUser;
  }
  public handleConnection(client: Socket): void {
    const key = client.handshake.headers.authorization;
    const roomName = client.handshake.headers.room;
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

  // 퇴장 햇을 시
  public handleDisconnect(client: Socket): void {
    this.server.emit('userLeaved', client.id);
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

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('hi');
    return 'Hello world!';
  }
}
