import { BoardLike } from 'src/board/entity/board-like.entity';
import { Board } from 'src/board/entity/board.entity';
import { Following } from 'src/friendship/entity/follwing.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { socialPlatform } from '../user.enum';

@Entity('user')
export class User {
  @PrimaryColumn()
  id: string;

  @Column({
    unique: true,
  })
  nickname: string;

  @Column()
  characterName: string;

  @Column({
    type: 'enum',
    enum: socialPlatform,
  })
  social: socialPlatform;

  @Column({
    type: 'date',
    default: 'NOW()',
  })
  created_at: Date;

  @Column({
    type: 'boolean',
    default: 'false',
  })
  deleted: boolean;

  @OneToMany(() => Board, board => board.user)
  boards: Board[];

  @OneToMany(() => BoardLike, like => like.board)
  likes: BoardLike[];

  @OneToMany(() => Following, following => following.userId)
  following: Following[];

  @OneToMany(() => Following, following => following.targetUserId)
  followedBy: Following[];
}
