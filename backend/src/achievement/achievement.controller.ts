import {
  Controller,
  Get,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AuthGuard } from '@nestjs/passport';
import { FriendshipService } from 'src/friendship/friendship.service';
import { AchievementService } from './achievement.service';

@Controller('achievement')
@UseGuards(AuthGuard('criticalGuard'))
export class AchievementController {
  constructor(
    private readonly achievementService: AchievementService,
    private readonly friendshipService: FriendshipService
  ) {}

  @Get('walk')
  async getWalkCount(
    @Req() req: any,
    @Query('year', ValidationPipe) year: number,
    @Query('month', ValidationPipe) month: number,
    @Query('range', ValidationPipe) range: string
  ) {
    const userId = req.user.id;
    const userList = await this.friendshipService.getFollowingList(userId);

    const usersWalkCounts = await this.achievementService.getUsersWalkCounts(
      userId,
      year,
      month,
      range,
      userList
    );

    return usersWalkCounts;
  }

  @OnEvent('saveWalkCount')
  async saveUserWalk(walkCountByUsers: any) {
    this.achievementService.saveWalkCount(walkCountByUsers);
  }
}
