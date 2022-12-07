import { IoAdapter } from '@nestjs/platform-socket.io';
import { instrument } from '@socket.io/admin-ui';

export class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, {
      cors: {
        origin: ['https://admin.socket.io',  'http://localhost:5173', 'https://sleepywoods.kr'],
        credentials: true,
      },
    });
    instrument(server, {
      auth: false,
    });
    return server;
  }
}
