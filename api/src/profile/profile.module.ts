import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProfileController } from 'src/profile/profile.controller';
import { UsersService } from 'src/users/users.service';
import { ProfileService } from './profile.service';

@Module({
  imports: [PrismaModule],
  exports: [ProfileService, ProfileModule],
  providers: [ProfileService, UsersService],
  controllers: [ProfileController],
})
export class ProfileModule {}
