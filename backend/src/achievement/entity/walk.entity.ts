import { User } from 'src/auth/entity/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity('walk')
export class Walk {
  @PrimaryColumn({
    type: 'string',
  })
  userid: string;

  @PrimaryColumn({
    type: 'int',
  })
  year: number;

  @PrimaryColumn({
    type: 'int',
  })
  month: number;

  @PrimaryColumn({
    type: 'int',
  })
  day: number;

  @Column({
    type: 'int',
    default: 0,
  })
  walk: number;

  @ManyToOne(() => User, user => user.walks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userid' })
  user: User;
}
