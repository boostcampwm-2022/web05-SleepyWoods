import { User } from 'src/auth/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { articleCategory } from '../article.enum';
import { BoardLike } from './board-like.entity';

@Entity('board')
export class Board {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column('varchar', { length: 64 })
  userId: string;

  @Column('varchar', { length: 128 })
  content: string;

  @Column({
    type: 'enum',
    enum: articleCategory,
  })
  category: articleCategory;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    type: 'boolean',
    default: 'false',
  })
  deleted: boolean;

  @ManyToOne(() => User, user => user.boards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => BoardLike, like => like.board)
  likes: BoardLike[];
}
