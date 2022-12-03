import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { Repository } from 'typeorm';
import { Following } from './entity/follwing.entity';

@Injectable()
export class FriendshipService {
  constructor(
    @InjectRepository(Following)
    private followingRepository: Repository<Following>
  ) {}

  async getFollowingList(userId: string): Promise<any[]> {
    // following테이블의 userId 컬럼이 user테이블의 id랑  natural join 데이터에서ㅡ nickcolumn만 select
    try {
      const resultList = await this.followingRepository
        .createQueryBuilder('following')
        .innerJoinAndSelect('following.targetUser', 'user')
        .where('following.userId = :userId AND user.deleted = false', {
          userId,
        })
        .getRawMany();
      const followingList = resultList.map(result => {
        return {
          userId: result.user_id,
          nickname: result.user_nickname,
          characterName: result.user_characterName,
        };
      });
      return followingList;
    } catch (e) {
      throw new NotFoundException('팔로잉 목록 조회 오류');
    }
  }
  async followFriend(userId: string, targetUserId: string): Promise<boolean> {
    try {
      //팔로잉 처리 처리
      const insertResult = await this.followingRepository
        .createQueryBuilder()
        .insert()
        .into(Following)
        .values({ userId, targetUserId })
        .execute();

      return insertResult.identifiers.length ? true : false;
    } catch (e) {
      throw new NotFoundException('이미 팔로우한 유저입니다.');
    }
  }

  async unfollowFriend(userId: string, targetUserId: string): Promise<true> {
    let deleteResult;
    try {
      deleteResult = await this.followingRepository
        .createQueryBuilder()
        .delete()
        .from(Following)
        .where('userId = :userId AND targetUserId = :targetUserId', {
          userId,
          targetUserId,
        })
        .execute();
    } catch (e) {
      throw new NotFoundException('팔로우 취소 실패');
    }

    if (deleteResult.affected) return true;
    else {
      throw new NotFoundException('팔로우 취소 실패');
    }
  }
}
