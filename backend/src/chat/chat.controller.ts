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
    const fromUserId = req.user.id;
    const chatRoomData = await this.chatService.getConnectedChatRoom({
      fromUserId,
      targetUserId,
    });

    const chatContent = await this.chatService.getChatContent(
      chatRoomData['roomid']
    );

    await this.chatService.updateReadCount(fromUserId, chatRoomData);
    return chatContent;
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

  @OnEvent('leaveChatRoom')
  async leaveChatRoom(payload: any) {
    const { fromUserId } = payload;
    const chatRoomData = await this.chatService.getConnectedChatRoom(payload);
    await this.chatService.updateReadCount(fromUserId, chatRoomData);
  }

  @OnEvent('saveChat')
  async saveChatReceiver(payload: any) {
    const chatRoomData = await this.chatService.getConnectedChatRoom(payload);
    await this.chatService.saveChat(chatRoomData['roomid'], payload);
  }
}
