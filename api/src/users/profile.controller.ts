import {
    Controller,
    Body,
    Get,
    Post,
    Req,
    Res,
    Param,
    NotFoundException,
    UseGuards
  } from '@nestjs/common';
  import { UserDto } from './dto/user.dto';
  import { UsersService } from './users.service';
  import { AuthorizationGuard } from '../auth/auth.guard';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { Request, Response } from 'express';
  import { createReadStream } from 'fs';
  import { join } from 'path';
  import { User } from './users.entity';

  @Controller('profile')
  export class ProfileController {
    constructor(
        // private profileService: ProfileService,
        private usersService: UsersService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('username')
    async getUserName(@Req() req: Request) {
        return await req.user;

    }

  }