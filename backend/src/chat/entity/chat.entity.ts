import { User } from 'src/auth/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatRoom } from './chat-room.entity';

@Entity('chat')
export class Chat {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column('int')
  roomId: number;

  @Column('varchar', { length: 64 })
  senderId: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp: Date;

  @Column('varchar', { length: 256 })
  message: string;

  @ManyToOne(() => ChatRoom, room => room.chats)
  @JoinColumn({ name: 'roomId' })
  room: ChatRoom;

  @ManyToOne(() => User, sender => sender.chats)
  @JoinColumn({ name: 'senderId' })
  sender: User;
}
