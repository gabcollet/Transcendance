import { Module } from '@nestjs/common';
import { PongGateway } from './pong/pong.gateway';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';
import { ChatGateway } from './chat/chat.gateway';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileController } from './users/profile.controller';
import { TestController } from './test/test.controller';
import { PongService } from './pong/pong.service';
import { TestingController } from './testing/testing.controller';

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
  controllers: [
    ChatController,
    UsersController,
    ProfileController,
    TestController,
    TestingController,
  ],
  providers: [UsersService, PongGateway, ChatGateway, PongService],
})
export class AppModule {}
