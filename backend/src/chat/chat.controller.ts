import {
  Controller,
  UseGuards,
  Get,
  Req,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatService } from './chat.service';
import { OnEvent } from '@nestjs/event-emitter';

@Controller('chat')
@UseGuards(AuthGuard('criticalGuard'))
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('roomList')
  async getChatRoomList(@Req() req: any) {
    const userId = req.user.id;
    const chatRoomList = await this.chatService.getChatRoomList(userId);
    return chatRoomList;
  }

  @Get('content')
  async getChatList(
    @Req() req: any,
    @Query('targetUserId', ValidationPipe) targetUserId: string
  ) {
    const userId = req.user.id;
    await this.chatService.getChatContent(userId, targetUserId);
  }

  @OnEvent('createChatRoom')
  async createChatRoom(payload: any) {
    const chatRoomData = await this.chatService.getConnectedChatRoom(payload);
    if (chatRoomData) {
      return;
    }

    const chatRoomId = await this.chatService.createChatRoom();
    await this.chatService.createChatMark(chatRoomId, payload);
  }

  @OnEvent('saveChat')
  async saveChatReceiver(payload: any) {
    const chatRoomData = await this.chatService.getConnectedChatRoom(payload);
    this.chatService.saveChat(chatRoomData['roomid'], payload);
  }
}
