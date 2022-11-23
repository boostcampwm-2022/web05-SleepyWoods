import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardLike } from './entity/board-like.entity';
import { Board } from './entity/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, BoardLike])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
