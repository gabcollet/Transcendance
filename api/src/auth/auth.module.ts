import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { Auth42Strategy } from './utils/auth42.strategy';

@Module({
  imports: [UsersModule],
  providers: [AuthService, Auth42Strategy],
  controllers: [AuthController],
})
export class AuthModule {}
