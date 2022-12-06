import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Following } from 'src/friendship/entity/follwing.entity';
import { FriendshipService } from 'src/friendship/friendship.service';
import { AchievementController } from './achievement.controller';
import { AchievementService } from './achievement.service';
import { Walk } from './entity/walk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Walk, Following])],
  controllers: [AchievementController],
  providers: [AchievementService, FriendshipService],
})
export class AchievementModule {}
