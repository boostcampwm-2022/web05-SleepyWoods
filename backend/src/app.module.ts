import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';

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
        entities: [User],
        synchronize: true,
      }),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
