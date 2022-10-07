import { forwardRef, Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule), UsersModule],
  exports: [ChatService],
  providers: [ChatService],
})
export class ChatModule {}
