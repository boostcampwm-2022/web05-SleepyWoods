import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [AuthModule, HttpModule],
  providers: [SocketService, SocketGateway, AuthService],
})
export class SocketModule {}
