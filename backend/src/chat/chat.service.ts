import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getChatContent(roomId: string) {
    // userId, targetUserId 를 기준으로 roomId 획득
    // 이후 roomId로 chat table 전체 긁어서 return
    try {
      const chatContent = await this.chatRepository
        .createQueryBuilder('chat')
        .select('*')
        .where('chat.roomId=:roomId', {
          roomId,
        })
        .getRawMany();
      return chatContent;
    } catch (e) {
      console.log(e);
      throw new NotFoundException('채팅 내용을 불러올 수 없습니다.');
    }
  }

  async getChatRoomList(userId: string) {
    try {
      const chatRoomList = await this.chatMarkRepository
        .createQueryBuilder('chatMark')
        .select('*')
        .innerJoin('chatMark.room', 'chat_room')
        .where('chatMark.userId=:userId', { userId })
        .getRawMany();
      if (chatRoomList.length == 0) {
        return [];
      }

      const roomTargerUser = await this.chatMarkRepository
        .createQueryBuilder('chatMark')
        .select([
          'chatMark.roomId as roomId',
          'chatMark.userId AS targetUserId',
          'user.nickname AS targetUserNickname',
          'MAX(chat.id) as lastchatid',
        ])
        .where(
          'chatMark.userId != :userId AND chatMark.roomId in (:...roomIdList)',
          { userId, roomIdList: chatRoomList.map(chatRoom => chatRoom.roomId) }
        )
        .innerJoin('chatMark.user', 'user')
        .leftJoin(Chat, 'chat', 'chat.room = chatMark.roomId')
        .groupBy('chatMark.roomId, chatMark.userId, user.nickname')
        .getRawMany();

      const lastMsgInRoom = await this.chatRepository
        .createQueryBuilder('chat')
        .select([
          'chat.id as id',
          'chat.timestamp as timestamp',
          'chat.message as message',
        ])
        .where('chat.id in (:...lastchatid)', {
          lastchatid: roomTargerUser.map(r => r.lastchatid),
        })
        .getRawMany();

      const result = roomTargerUser.map(room => {
        const chatRoomInfo = chatRoomList.find(e => e.roomId == room.roomid);
        const msg = lastMsgInRoom.find(e => e.id == room.lastchatid);
        return {
          roomId: room.roomid,
          targetUserId: room.targetuserid,
          targetUserNickname: room.targetusernickname,
          unReadCount: chatRoomInfo.totalmsgcount - chatRoomInfo.readCount,
          lastMsg: msg,
        };
      });
      console.log('result');
      console.log(result);
      return result || [];
    } catch (e) {
      console.log(e);
      throw new NotFoundException('채팅방 불러오기 실패');
    }
  }

  async getConnectedChatRoom(payload: any): Promise<any> {
    let chatRoom;
    try {
      const { fromUserId, targetUserId } = payload;
      console.log(fromUserId, targetUserId);
      chatRoom = await this.chatMarkRepository
        .createQueryBuilder('chatMark')
        .select([
          'chatMark.roomId AS roomId',
          'MAX(chat_room.totalmsgcount) as totalmsgcount',
        ])
        .innerJoin('chatMark.room', 'chat_room')
        .where('chatMark.userId=:userA OR chatMark.userId=:userB', {
          userA: fromUserId,
          userB: targetUserId,
        })
        .groupBy('chatMark.roomId')
        .having('COUNT(chatMark.roomId)>1')
        .getRawMany();
    } catch (e) {
      throw new NotFoundException('해당하는 방이 없습니다.');
    }

    if (!chatRoom || chatRoom.length == 0) {
      return false;
    } else {
      return chatRoom[0];
    }
  }

  async createChatRoom(): Promise<number> {
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
      readCount: chatRoomData['totalmsgcount'],
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
