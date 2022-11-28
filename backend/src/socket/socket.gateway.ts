import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthService } from 'src/auth/auth.service';
import { UserDataDto } from 'src/auth/dto/user-data.dto';

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
    const userData = this.authService.verify(key);
    if (!userData) {
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
    };

    client.join('chat');
    client.to('chat').emit('userCreated', client['userData']);
    this.server.to(client.id).emit('userCreated', this.getRoomUserData('chat'));
  }

  // 퇴장 햇을 시
  public handleDisconnect(client: Socket): void {
    console.log('disconnected', client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log('hi');
    return 'Hello world!';
  }
}
