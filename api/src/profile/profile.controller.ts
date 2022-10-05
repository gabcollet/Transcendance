import {
  Controller,
  Body,
  Get,
  Post,
  Req,
  Res,
  Param,
  NotFoundException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthorizationGuard } from '../auth/auth.guard';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { UserDto } from '../users/dto';
import { ProfileService } from 'src/profile/profile.service';

@Controller('profile')
export class ProfileController {
  constructor(
    private usersService: UsersService,
    private profileService: ProfileService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('username')
  getUsername(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('leaderboard')
  getLeaderboard() {
    return this.profileService.getLeaderboard();
  }

  @UseGuards(JwtAuthGuard)
  @Get('leaderboard/:name')
  getLeaderboardRank(@Param() params) {
    return this.profileService.getLeaderboardRank(params.name);
  }
}
