import { User } from 'src/auth/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ChatRoom } from './chat-room.entity';

@Entity('chat_mark')
export class ChatMark {
  @PrimaryColumn({
    type: 'int',
  })
  roomId: number;

  @PrimaryColumn({
    type: 'int',
  })
  userId: string;

  @Column('int', { default: 0 })
  readCount: number;

  @ManyToOne(() => ChatRoom, room => room.id)
  @JoinColumn({ name: 'roomId' })
  room: ChatRoom;

  @ManyToOne(() => User, user => user.chatMark)
  @JoinColumn({ name: 'userId' })
  user: User;
}
