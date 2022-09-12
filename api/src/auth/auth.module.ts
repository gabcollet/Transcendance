import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from './auth.strategy';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    PassportModule.register(AuthStrategy),
    JwtModule.register({
      // secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '5d' },
    }),
  ],
  providers: [AuthService, AuthStrategy, UsersService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
