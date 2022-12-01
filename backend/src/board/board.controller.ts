import {
  Controller,
  Delete,
  Get,
  Post,
  UseGuards,
  Req,
  Param,
  ParseIntPipe,
  UnauthorizedException,
  NotFoundException,
  Put,
  Body,
  ValidationPipe,
  NotAcceptableException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BoardService } from './board.service';
import { ArticleDataDto } from './dto/article-data.dto';
import { articleCategoryValidationPipe } from './pipes/category.pipe';

@Controller('board')
@UseGuards(AuthGuard('criticalGuard'))
export class BoardController {
  constructor(private readonly service: BoardService) {}

  @Get('like')
  async getLikeList(@Req() req: any) {
    const userId = req.user.id;
    const articleList = await this.service.getLikeBoardList(userId);
    return articleList;
  }

  @Get(':range')
  async getBoardList(@Req() req: any, @Param('range') range: string) {
    const userId = req.user.id;
    const articleList = await this.service.getBoardList(userId, range);
    return articleList;
  }

  @Post()
  async writeBoard(
    @Body('articleData', ValidationPipe, articleCategoryValidationPipe)
    articleData: ArticleDataDto,
    @Req() req: any
  ) {
    const userId: string = req.user.id;
    const isComplete = await this.service.writeBoard(userId, articleData);
    if (!isComplete) {
      throw new NotFoundException('글 작성 실패');
    } else {
      return '글 작성 성공';
    }
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

  @Put('like/:articleId')
  async likeArticle(
    @Req() req: any,
    @Param('articleId', ParseIntPipe) articleId: number
  ) {
    const { id } = req.user;

    const isLiked = await this.service.insertlike(articleId, id);
    if (!isLiked) {
      throw new NotAcceptableException('이미 좋아요를 누르셨습니다.');
    } else {
      return '좋아요 성공';
    }
  }

  @Delete('like/:articleId')
  async unLikeArticle(
    @Req() req: any,
    @Param('articleId', ParseIntPipe) articleId: number
  ) {
    const { id } = req.user;
    const isDeleted = await this.service.deleteLike(articleId, id);
    if (isDeleted) {
      return '좋아요 취소 성공';
    } else {
      throw new NotAcceptableException('이미 처리되었습니다.');
    }
  }
}
