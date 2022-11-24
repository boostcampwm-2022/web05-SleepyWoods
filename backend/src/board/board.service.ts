import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendshipService } from 'src/friendship/friendship.service';
import { Repository } from 'typeorm';
import { ArticleDataDto } from './dto/article-data.dto';
import { BoardLike } from './entity/board-like.entity';
import { Board } from './entity/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @InjectRepository(BoardLike)
    private readonly boardLikeRepository: Repository<BoardLike>,
    private readonly friendshipService: FriendshipService
  ) {}

  async getAllBoard(userId: string): Promise<Board[]> {
    // 팔로잉 리스트
    // in
    try {
      const followingList = await this.friendshipService.getFollowingList(
        userId
      );
      const followingIdList = [userId, ...followingList.map(user => user.id)];

      const articleList = await this.boardRepository
        .createQueryBuilder('board')
        .select(['board', 'user.nickname'])
        .innerJoin('board.user', 'user')
        .where('board.userId IN (:...list) AND board.deleted = false', {
          list: followingIdList,
        })
        .orderBy('board.created_at', 'DESC') // 최신순 정렬처리
        .getMany();

      return articleList;
    } catch (e) {
      throw new NotFoundException('게시글 불러오기 오류');
    }
  }

  async writeBoard(userId: string, articleData: ArticleDataDto) {
    try {
      const { content, category } = articleData;
      const insertResult = await this.boardRepository
        .createQueryBuilder()
        .insert()
        .into(Board)
        .values({ content, category, userId })
        .execute();

      return insertResult.identifiers.length ? true : false;
    } catch (e) {
      console.log(e);
      throw new NotFoundException('글 쓰기 실패');
    }
  }

  async deleteBoard(articleId: number, userId: string): Promise<boolean> {
    try {
      const deleteResult = await this.boardRepository
        .createQueryBuilder()
        .update()
        .set({ deleted: true })
        .where('id = :articleId AND userId = :userId', { articleId, userId })
        .execute();

      return deleteResult.affected ? true : false;
    } catch (e) {
      throw new NotFoundException('알 수 없는 오류');
    }
  }

  async deleteLike(articleId: number, userId: string): Promise<boolean> {
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
      console.log(e.code);
      if (e.code == 23505) {
        throw new NotAcceptableException('이미 좋아요를 누르셨습니다.');
      } else {
        throw new NotFoundException('해당하는 게시글이 없습니다.');
      }
    }
  }
}
