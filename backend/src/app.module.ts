import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';
import { BoardModule } from './board/board.module';
import { BoardLike } from './board/entity/board-like.entity';
import { Board } from './board/entity/board.entity';
import { Following } from './friendship/entity/follwing.entity';
import { FriendshipModule } from './friendship/friendship.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_ID,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [User, Board, BoardLike, Following],
        synchronize: true,
      }),
    }),
    AuthModule,
    BoardModule,
    FriendshipModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
