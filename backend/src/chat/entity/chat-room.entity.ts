import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChatMark } from './chat-mark.entity';
import { Chat } from './chat.entity';

@Entity('chat_room')
export class ChatRoom {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column('int', { default: 0 })
  totalmsgcount: number;

  @OneToMany(() => Chat, chat => chat.room)
  chats: Chat[];

  @OneToMany(() => ChatMark, mark => mark.room)
  chatMark: ChatMark[];
}
