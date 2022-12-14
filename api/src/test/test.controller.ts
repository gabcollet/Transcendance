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
import { UsersService } from '../users/users.service';
import { AuthorizationGuard } from '../auth/auth.guard';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { UserDto } from '../users/dto';
import { PongService } from 'src/pong/pong.service';

@Controller('test')
export class TestController {
  constructor(
    private usersService: UsersService,
    private pongService: PongService,
  ) {}

  @Get('createusers')
  CreateUsers() {
    return this.usersService.testCreateUsers();
  }

  @Get('createfriendships')
  CreateFriendships() {
    return this.usersService.testCreateFriendships();
  }

  @Get('deleteall')
  deleteAll() {
    return this.usersService.testDeleteAll();
  }

  @Get('creatematches')
  createMatches() {
    this.pongService.addHistory('laube', 'anon3', 3, 2);
    this.pongService.addHistory('anon3', 'laube', 3, 2);
    this.pongService.addHistory('laube', 'anon30', 5, 2);
    this.pongService.addHistory('laube', 'anon31', 3, 9);
    this.pongService.addHistory('laube', 'anon3', 3, 2);
  }
}
