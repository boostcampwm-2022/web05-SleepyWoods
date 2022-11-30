import {
  Controller,
  UseGuards,
  Get,
  Post,
  Body,
  Res,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ChatService } from './chat.service';
import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter';

@Controller('chat')
@UseGuards(AuthGuard('criticalGuard'))
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // 채팅방 내용 조회
  @Get('test1')
  getChatContent1() {
    // 성준 -> 형진
    this.chatService.getConnectedChatRoom({
      fromUserId: 'Z-NVwpPpbw7oOjHEn-CYEZ8V9nU3P9IIChz_9PuuVak',
      targetUserId: 'IZI_1Wzwhqblu0A4KA_TCrtkl4mM55Qstc_FDKMv_sY',
    });
  }
  // 채팅방 내용 조회
  @Get('test2')
  getChatContent2() {
    // 형진 -> 성준
    this.chatService.getConnectedChatRoom({
      fromUserId: 'IZI_1Wzwhqblu0A4KA_TCrtkl4mM55Qstc_FDKMv_sY',
      targetUserId: 'Z-NVwpPpbw7oOjHEn-CYEZ8V9nU3P9IIChz_9PuuVak',
    });
  }

  @Get('test3')
  async getChatContent3() {
    // 형전 -> 현서
    console.log(
      await this.chatService.getConnectedChatRoom({
        fromUserId: 'IZI_1Wzwhqblu0A4KA_TCrtkl4mM55Qstc_FDKMv_sY',
        targetUserId: '9B8X7YWtA0XlNTBzCItRGmLlUKBYkHdshMPqtsE7sWE',
      })
    );
  }

  @Get('roomList')
  async getChatRoomList(@Req() req: any) {
    const userId = req.user.id;
    this.chatService.getChatRoomList(userId);
    // 이 아이디랑 방을 맺은 방들을 찾아보기 chatMark,
    return 'ok';
  }

  // @Get('chatList')
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
