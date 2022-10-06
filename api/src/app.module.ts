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
import { ProfileController } from './profile/profile.controller';
import { TestController } from './test/test.controller';
import { ChatDto } from './chat/chat.dto';
import { PongService } from './pong/pong.service';
import { TestingController } from './testing/testing.controller';
import { AchievementService } from './pong/achievement.service';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    AuthModule,
    ChatModule,
    UsersModule,
    ProfileModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    ProfileModule,
  ],
  controllers: [
    ChatController,
    UsersController,
    ProfileController,
    TestController,
    TestingController,
  ],
  providers: [
    UsersService,
    PongGateway,
    ChatGateway,
    PongService,
    ChatDto,
    ProfileService,
    AchievementService,
  ],
})
export class AppModule {}
