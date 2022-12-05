import { Controller, UseGuards } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthGuard } from '@nestjs/passport';
import { AchievementService } from './achievement.service';

@Controller('achievement')
@UseGuards(AuthGuard('criticalGuard'))
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @OnEvent('saveWalkCount')
  async saveUserWalk(walkCountByUsers: any) {
    this.achievementService.saveWalkCount(walkCountByUsers);
  }
}
