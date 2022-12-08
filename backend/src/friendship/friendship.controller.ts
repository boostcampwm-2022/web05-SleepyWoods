import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/auth/user.service';
import { FriendshipService } from './friendship.service';

@Controller('friendship')
@UseGuards(AuthGuard('criticalGuard'))
export class FriendshipController {
  constructor(
    private readonly friendshipService: FriendshipService,
    private readonly userService: UserService
  ) {}

  @Get()
  async getFollowingList(@Req() req: any) {
    const userId = req.user.id;
    const followingList = await this.friendshipService.getFollowingList(userId);
    return followingList;
  }

  @Get('/:searchNickname')
  async getUserListByNickname(
    @Param('searchNickname', ValidationPipe) searchNickname: string
  ) {
    return await this.userService.findUserListByNickname(searchNickname);
  }

  // PUT friendship 요청
  @Put('/:targetNickname')
  async followFriend(
    @Req() req: any,
    @Param('targetNickname') targetNickname: string
  ) {
    const userId = req.user.id;
    const targetUserId = await this.userService.getUserIdByNickname(
      targetNickname
    );
    if (targetUserId == userId) {
      throw new NotFoundException('자기 자신은 친구로 추가할 수 없습니다.');
    }
    await this.friendshipService.followFriend(userId, targetUserId);
    const followingList = await this.friendshipService.getFollowingList(userId);
    return followingList.find(
      following => following.nickname === targetNickname
    );
  }

  @Delete('/:targetNickname')
  async unfollowFriend(
    @Req() req: any,
    @Param('targetNickname') targetNickname: string
  ) {
    const userId = req.user.id;

    const targetUserId = await this.userService.getUserIdByNickname(
      targetNickname
    );
    await this.friendshipService.unfollowFriend(userId, targetUserId);
    return '팔로우 취소 성공';
  }
}
