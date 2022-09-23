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
import { PrismaModule } from './prisma/prisma.module';
import { ProfileController } from './users/profile.controller';
import { TestController } from './test/test.controller';

@Module({
  imports: [
    AuthModule,
    PongModule,
    ChatModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
  ],
  controllers: [
    PongController,
    ChatController,
    UsersController,
    ProfileController,
    TestController,
  ],
  providers: [PongService, UsersService, PongGateway],
})
export class AppModule {}
