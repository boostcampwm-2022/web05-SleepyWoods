import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMark } from './entity/chat-mark.entity';
import { ChatRoom } from './entity/chat-room.entity';
import { Chat } from './entity/chat.entity';
@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatRoom)
    private chatRoomRepository: Repository<ChatRoom>,
    @InjectRepository(ChatMark)
    private chatMarkRepository: Repository<ChatMark>,
    @InjectRepository(Chat) private chatRepository: Repository<Chat>
  ) {}

  async getChatRoom(payload: any): Promise<any[] | undefined> {
    //exists, in
    const { fromUserId, targetUserId } = payload;
    const chatRoom = await this.chatMarkRepository
      .createQueryBuilder('chatMark')
      .select([
        'chatMark.roomId AS roomId',
        'MAX(chatMark.readCount) as maxReadCount',
      ])
      .where('chatMark.userId=:userA OR chatMark.userId=:userB', {
        userA: fromUserId,
        userB: targetUserId,
      })
      .groupBy('chatMark.roomId')
      .having('COUNT(chatMark.roomId)>1')
      .getRawMany();

    return chatRoom[0] || undefined;
  }

  async createChatRoom(payload: any): Promise<number> {
    const chatRoom = await this.chatRoomRepository.insert({
      totalmsgcount: 0,
    });
    return chatRoom.identifiers[0]['id'];
  }

  async createChatMark(roomId: number, payload: any): Promise<boolean> {
    try {
      const { fromUserId, targetUserId } = payload;
      const chatMark = await this.chatMarkRepository.insert([
        { userId: fromUserId, roomId },
        { userId: targetUserId, roomId },
      ]);
      return chatMark.identifiers.length == 2 ? true : false;
    } catch (e) {
      return false;
    }
  }

  async updateReadCount(userId, chatRoomData: any): Promise<void> {
    await this.chatMarkRepository.save({
      roomId: chatRoomData['roomid'],
      userId,
      readCount: chatRoomData['maxreadcount'],
    });
  }

  async saveChat(roomId: number, payload: any) {
    const { fromUserId: senderId, message } = payload;

    try {
      const chatInsertResult = await this.chatRepository.insert({
        roomId,
        senderId,
        message,
      });
      await this.chatRoomRepository
        .createQueryBuilder()
        .update(ChatRoom)
        .set({ totalmsgcount: () => 'totalmsgcount+1' })
        .where('id=:roomId', { roomId })
        .execute();
    } catch (e) {
      console.log(e);
      console.log('채팅 저장 오류');
    }
  }
}
