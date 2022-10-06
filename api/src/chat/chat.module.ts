import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  exports: [ChatService],
  providers: [ChatService],
})
export class ChatModule {}
