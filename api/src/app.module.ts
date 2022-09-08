import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PongController } from './pong/pong.controller';
import { PongService } from './pong/pong.service';
import { PongModule } from './pong/pong.module';
import { ChatController } from './chat/chat.controller';
import { ChatModule } from './chat/chat.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [AuthModule, PongModule, ChatModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
