import { Controller, UseGuards, Get, Post, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatService } from './chat.service';
import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter';

@Controller('chat')
@UseGuards(AuthGuard('criticalGuard'))
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private event: EventEmitter2
  ) {}

  // 채팅방 내용 조회
  @Get('test1')
  getChatContent1() {
    // 성준 -> 형진
    this.chatService.getChatRoom({
      fromUserId: 'Z-NVwpPpbw7oOjHEn-CYEZ8V9nU3P9IIChz_9PuuVak',
      targetUserId: 'IZI_1Wzwhqblu0A4KA_TCrtkl4mM55Qstc_FDKMv_sY',
    });
  }
  // 채팅방 내용 조회
  @Get('test2')
  getChatContent2() {
    // 형진 -> 성준
    this.chatService.getChatRoom({
      fromUserId: 'IZI_1Wzwhqblu0A4KA_TCrtkl4mM55Qstc_FDKMv_sY',
      targetUserId: 'Z-NVwpPpbw7oOjHEn-CYEZ8V9nU3P9IIChz_9PuuVak',
    });
  }

  @Get('test3')
  getChatContent3() {
    // 형전 -> 현서
    this.chatService.getChatRoom({
      fromUserId: 'IZI_1Wzwhqblu0A4KA_TCrtkl4mM55Qstc_FDKMv_sY',
      targetUserId: '9B8X7YWtA0XlNTBzCItRGmLlUKBYkHdshMPqtsE7sWE',
    });
  }

  @OnEvent('createChatRoom')
  async createChatRoom(payload: any) {
    const chatRoomData = await this.chatService.getChatRoom(payload);

    if (chatRoomData) {
      return;
    }

    const chatRoomId = await this.chatService.createChatRoom(payload);
    await this.chatService.createChatMark(chatRoomId, payload);
  }

  @OnEvent('saveChat')
  async saveChatReceiver(payload: any) {
    const chatRoomData = await this.chatService.getChatRoom(payload);
    this.chatService.saveChat(chatRoomData['roomid'], payload);
  }
}
