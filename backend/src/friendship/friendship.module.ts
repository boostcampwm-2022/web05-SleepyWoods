import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { UserService } from 'src/auth/user.service';
import { Following } from './entity/follwing.entity';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Following])],
  controllers: [FriendshipController],
  providers: [FriendshipService, UserService],
})
export class FriendshipModule {}
