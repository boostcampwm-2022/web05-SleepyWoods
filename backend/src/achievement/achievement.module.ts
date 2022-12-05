import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementController } from './achievement.controller';
import { AchievementService } from './achievement.service';
import { Walk } from './entity/walk.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Walk])],
  controllers: [AchievementController],
  providers: [AchievementService],
})
export class AchievementModule {}
