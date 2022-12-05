import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Walk } from './entity/walk.entity';

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(Walk) private walkRepository: Repository<Walk>
  ) {}

  async saveWalkCount(walkCountByUser: any) {
    try {
      const today = new Date().toISOString().substring(0, 10);
      const walkCountArray = walkCountByUser.map(([userId, walk]) => {
        return {
          userid: userId,
          date: today,
          walk: Math.floor(walk / 10),
        };
      });
      this.walkRepository.save(walkCountArray);
    } catch (e) {
      console.log(e);
    }
  }
}
