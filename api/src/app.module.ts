import { Module } from '@nestjs/common';
import { PongGateway } from './pong.gateway';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PongController } from './pong/pong.controller';
import { PongService } from './pong/pong.service';
import { PongModule } from './pong/pong.module';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';

@Module({
  imports: [
    AuthModule,
    PongModule,
    ChatModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'pass',
      database: 'trans_db',
      entities: [User],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [PongController, ChatController, UsersController],
  providers: [PongService, UsersService, PongGateway],
})
export class AppModule {}
