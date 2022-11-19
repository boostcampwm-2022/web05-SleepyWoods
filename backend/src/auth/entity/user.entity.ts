import { Column, Entity, PrimaryColumn } from 'typeorm';
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
  character_name: string;

  @Column()
  email: string;

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
}
