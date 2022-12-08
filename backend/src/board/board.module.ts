import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Following } from 'src/friendship/entity/follwing.entity';
import { FriendshipService } from 'src/friendship/friendship.service';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { BoardLike } from './entity/board-like.entity';
import { Board } from './entity/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Board, BoardLike, Following])],
  controllers: [BoardController],
  providers: [BoardService, FriendshipService],
})
export class BoardModule {}
