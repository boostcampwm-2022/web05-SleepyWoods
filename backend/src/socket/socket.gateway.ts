import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // 입장 햇을 시
  public handleConnection(client: Socket): void {
    //
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
