import {
  Controller,
  Get,
  Req,
  Param,
  UseGuards,
  Logger,
  Body,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { request } from 'http';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { Request, Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { Chatroom, Message } from '@prisma/client';
import { ChatDto } from './chat.dto';

import {
  IsString,
  IsAlphanumeric,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

@Controller('chat')
export class ChatController {
  constructor(
    private usersService: UsersService,
    private prisma: PrismaService,
    private policy: ChatDto,
  ) {}
  logger: Logger = new Logger('ChatController');
  @Get('convo')
  getConvo(@Req() req: Request, @Param() params) {}

  @UseGuards(JwtAuthGuard)
  @Get('channels')
  getChannels(@Req() req: Request) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-channels')
  async createChannels(@Req() request: Request, @Body() body: ChatDto) {
    let password = '';
    let admin = JSON.stringify(request.user);

    if (body.protected === false) {
      password = '';
    } else {
      password = body.password;
    }
    const channel = await this.prisma.chatroom.create({
      data: {
        name: body.name,
        admin: admin,
        protected: body.protected,
        password: password,
        visibility: body.checked,
      },
    });
    this.logger.log('Channel created');
  }
}
