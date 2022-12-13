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
import { SocketModule } from './socket/socket.module';
import { ChatModule } from './chat/chat.module';
import { Chat } from './chat/entity/chat.entity';
import { ChatRoom } from './chat/entity/chat-room.entity';
import { ChatMark } from './chat/entity/chat-mark.entity';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AchievementModule } from './achievement/achievement.module';
import { Walk } from './achievement/entity/walk.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV == 'dev' ? '.env.dev' : '.env.prod',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_ID,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [
          User,
          Board,
          BoardLike,
          Following,
          Chat,
          ChatRoom,
          ChatMark,
          Walk,
        ],
        synchronize: true,
      }),
    }),
    AuthModule,
    BoardModule,
    FriendshipModule,
    SocketModule,
    ChatModule,
    AchievementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
