import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from './auth.strategy';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [PassportModule.register(AuthStrategy), UsersModule],
  providers: [AuthService, AuthStrategy, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
