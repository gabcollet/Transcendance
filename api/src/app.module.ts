import { Module } from '@nestjs/common';
import { PongGateway } from './pong/pong.gateway';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat.gateway';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileController } from './users/profile.controller';
import { TestController } from './test/test.controller';

@Module({
  imports: [
    AuthModule,
    ChatModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
  ],
  controllers: [ChatController, UsersController],
  providers: [UsersService, PongGateway, ChatGateway],
})
export class AppModule {}
