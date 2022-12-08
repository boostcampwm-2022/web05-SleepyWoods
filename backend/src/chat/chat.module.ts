import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatMark } from './entity/chat-mark.entity';
import { ChatRoom } from './entity/chat-room.entity';
import { Chat } from './entity/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat, ChatRoom, ChatMark])],
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
