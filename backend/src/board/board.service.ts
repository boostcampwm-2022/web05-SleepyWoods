import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { listenerCount } from 'process';
import { Repository, FindOptionsWhere } from 'typeorm';
import { BoardLike } from './entity/board-like.entity';
import { Board } from './entity/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(BoardLike)
    private boardLikeRepository: Repository<BoardLike>
  ) {}

  async deleteBoard(articleId: number, userId: string): Promise<boolean> {
    try {
      console.log(articleId, userId);
      const deleteResult = await this.boardRepository
        .createQueryBuilder()
        .delete()
        .from(Board)
        .where('id = :articleId AND userId = :userId', { articleId, userId })
        .execute();
      return deleteResult.affected ? true : false;
    } catch (e) {
      throw new NotFoundException('알 수 없는 오류');
    }
  }

  async deleteLike(articleId: number, userId: string): Promise<boolean> {
    console.log(articleId, userId);
    try {
      //좋아요 처리
      const deleteResult = await this.boardLikeRepository
        .createQueryBuilder()
        .delete()
        .from(BoardLike)
        .where('articleId = :articleId AND userId = :userId', {
          articleId,
          userId,
        })
        .execute();
      return deleteResult.affected ? true : false;
    } catch (e) {
      //무슨 상황이 있으려나
      throw new NotFoundException('해당 하는 게시글이 없습니다.');
    }
  }

  async insertlike(articleId: number, userId: string): Promise<boolean> {
    try {
      //좋아요 처리
      const insertResult = await this.boardLikeRepository
        .createQueryBuilder()
        .insert()
        .into(BoardLike)
        .values({ articleId, userId })
        .execute();
      return insertResult.identifiers.length ? true : false;
    } catch (e) {
      //무슨 상황이 있으려나
      throw new NotFoundException('알 수 없는 오류');
    }
  }
}
