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
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { AuthorizationGuard } from '../auth/auth.guard';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { Request, Response } from 'express';
  import { createReadStream } from 'fs';
  import { join } from 'path';
  import { UserDto } from './dto';

  @Controller('profile')
  export class ProfileController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('username')
    getUsername(@Req() req: Request) {
        console.log(req.user);
        return req.user;
    }
  }