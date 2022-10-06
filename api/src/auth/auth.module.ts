import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from './auth.strategy';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { ProfileService } from 'src/profile/profile.service';
import { ChatService } from 'src/chat/chat.service';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    PassportModule.register(AuthStrategy),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [
    AuthService,
    ChatService,
    AuthStrategy,
    JwtStrategy,
    UsersService,
    JwtService,
    ProfileService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
