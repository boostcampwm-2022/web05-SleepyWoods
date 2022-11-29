import { User } from 'src/auth/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Board } from './board.entity';

@Entity('board_like')
export class BoardLike {
  @PrimaryColumn('varchar', { length: 64 })
  userId: string;

  @PrimaryColumn()
  articleId: number;

  @ManyToOne(() => User, user => user.boards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Board, board => board.likes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'articleId' })
  board: Board;
}
