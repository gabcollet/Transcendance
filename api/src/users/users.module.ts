import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { Friendship } from './friendship.entity';
import { UsersService } from './users.service';
import { ProfileController } from './profile.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Friendship])
  ],
  exports: [UsersService, TypeOrmModule],
  providers: [UsersService],
  controllers: [UsersController, ProfileController],
})
export class UsersModule {}
