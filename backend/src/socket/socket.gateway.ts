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

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly authService: AuthService) {}

  // 입장 햇을 시
  // 이사람이 누군지 먼저 판별?

  public handleConnection(client: Socket): void {
    const key = client.handshake.headers.authorization;
    const userData = this.authService.verify(key);
    if (!userData) {
      client.disconnect();
    }

    console.log('connected', client.id);
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
