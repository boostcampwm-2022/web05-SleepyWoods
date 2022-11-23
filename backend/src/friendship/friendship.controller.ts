import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
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
    const { id } = req.user;
    const followingList = await this.friendshipService.getFollowingList(id);
    return followingList;
  }

  // PUT friendship 요청
  @Put('/:targetNickname')
  async followFriend(
    @Req() req: any,
    @Param('targetNickname') targetNickname: string
  ) {
    const { id } = req.user;
    const targetUserId = await this.userService.getUserIdByNickname(
      targetNickname
    );
    const result = await this.friendshipService.followFriend(id, targetUserId);

    return result ? '팔로우 성공' : '팔로우 실패';
    // 404 -> 없는 놈임
  }
  @Delete('/:targetNickname')
  async unfollowFriend(
    @Req() req: any,
    @Param('targetNickname') targetNickname: string
  ) {
    const { id } = req.user;

    const targetUserId = await this.userService.getUserIdByNickname(
      targetNickname
    );
    const result = await this.friendshipService.unfollowFriend(
      id,
      targetUserId
    );

    return result ? '팔로우 취소 성공' : '팔로우 목록에 없는 유저';
    // delete
  }
}

// 없는놈 404
// 잇는놈
