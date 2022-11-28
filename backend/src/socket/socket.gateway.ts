import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsAuthGuard } from 'src/auth/guards/ws-auth.guard';

@WebSocketGateway()
@UseGuards(WsAuthGuard)
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly jwtService: JwtService) {}

  // 입장 햇을 시
  // 이사람이 누군지 먼저 판별?

  public handleConnection(client: Socket): void {
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
