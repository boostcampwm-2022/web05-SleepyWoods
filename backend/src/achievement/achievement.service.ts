import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Walk } from './entity/walk.entity';

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(Walk) private walkRepository: Repository<Walk>
  ) {}

  async getUsersWalkCounts(
    year: number,
    month: number,
    range: string,
    userList: any
  ) {
    try {
      const result = await this.walkRepository
        .createQueryBuilder('walk')
        .select([
          'walk.userid as userid',
          'walk.year as year',
          'walk.month as month',
          'SUM(walk.walk) as walkcount ',
          'user.nickname as nickname',
        ])
        .innerJoin('walk.user', 'user')
        .groupBy('walk.userid, walk.year, walk.month, user.nickname')
        .having(
          range == 'all'
            ? 'walk.year = :year AND walk.month = :month'
            : 'walk.year = :year AND walk.month = :month AND walk.userid in (:...userList)',
          { year, month, userList: userList.map(user => user.userId) }
        )
        .orderBy('SUM(walk.walk)', 'DESC')
        .getRawMany();
      return result;
    } catch (e) {
      return [];
    }
  }

  async saveWalkCount(walkCountByUser: any) {
    try {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();

      const walkCountArray = walkCountByUser.map(([userId, walk]) => {
        return {
          userid: userId,
          year,
          month,
          day,
          walk: Math.floor(walk / 10),
        };
      });
      this.walkRepository.save(walkCountArray);
    } catch (e) {
      console.log(e);
    }
  }
}
