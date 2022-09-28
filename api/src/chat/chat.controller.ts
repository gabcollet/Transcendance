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
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
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
  async createChannels(@Body() body: ChatDto) {
    // const channel = await this.prisma.message.create({ data: body });
    let password: string = body.password;
    // if (password.length < 6 && password !== '') {
    //   throw new BadRequestException('password too short');
    // }
    this.logger.debug('Channel created');
    this.logger.debug(body);
  }
}
