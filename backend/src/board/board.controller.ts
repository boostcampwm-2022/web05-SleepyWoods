import {
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  Req,
  Param,
  PipeTransform,
  ParseIntPipe,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BoardService } from './board.service';

@Controller('board')
@UseGuards(AuthGuard('criticalGuard'))
export class BoardController {
  constructor(private readonly service: BoardService) {}
  @Get()
  getAllBoard() {
    // [GET] 기록 공유 전체 조회
    // 자기꺼랑, 팔로잉 리스트의 게시글들 시간순
    return 'zzzz';
  }

  @Post()
  writeBoard(articleData: any) {
    // data가 오면 그대로 넣어주기. DTO 만들기 추천.
    // [POST] 기록 공유 작성
  }

  @Delete(':articleId')
  async deleteBoard(
    @Req() req: any,
    @Param('articleId', ParseIntPipe) articleId: number
  ) {
    const { id } = req.user;
    const result = await this.service.deleteBoard(articleId, id);
    if (result) {
      return '삭제처리 되었습니다.';
    } else {
      throw new UnauthorizedException('삭제 권한이 없습니다.');
    }
  }

  @Post('likeToggle/:articleId')
  async likeToggle(
    @Req() req: any,
    @Param('articleId', ParseIntPipe) articleId: number
  ) {
    const { id } = req.user;

    const isDeleted = await this.service.deleteLike(articleId, id);
    if (isDeleted) {
      return '좋아요 취소 성공';
    } else {
      const isLiked = await this.service.insertlike(articleId, id);
      if (!isLiked) {
        throw new NotFoundException('좋아요 토글 실패');
      }
      return '좋아요 성공';
    }
  }
}
