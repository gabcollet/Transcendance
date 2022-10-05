import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PongService } from 'src/pong/pong.service';
import { ProfileModule } from 'src/profile/profile.module';
import { ProfileService } from 'src/profile/profile.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ProfileController } from '../profile/profile.controller';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule],
  exports: [UsersService, UsersModule],
  providers: [UsersService, PongService, ProfileService],
  controllers: [UsersController, ProfileController],
})
export class UsersModule {}
