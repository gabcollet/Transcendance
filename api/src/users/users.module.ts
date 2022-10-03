import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PongService } from 'src/pong/pong.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ProfileController } from './profile.controller';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  exports: [UsersService, UsersModule],
  providers: [UsersService, PongService],
  controllers: [UsersController, ProfileController],
})
export class UsersModule {}
