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
  RawBodyRequest,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { ChatService } from './chat.service';
import { Request, Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { Chatroom, Message } from '@prisma/client';
import { ChatDto } from './chat.dto';
import { User } from '@prisma/client';

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
    private chatService: ChatService,
  ) {}
  logger: Logger = new Logger('ChatController');
  @Get('convo')
  getConvo(@Req() req: Request, @Param() params) {}

  @UseGuards(JwtAuthGuard)
  @Get('channels')
  getChannels(@Req() req: Request) {}

  @UseGuards(JwtAuthGuard)
  @Post('create-channel')
  async createChannelsReq(@Req() request: Request, @Body() body: ChatDto) {
    let channel = await this.chatService.createChannel(body, request);
    return channel;
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-channels')
  async getChannelsReq(@Req() request: Request) {
    let channels = await this.chatService.getChannels(request);
    return channels;
  }

  @UseGuards(JwtAuthGuard)
  @Post('join-channel')
  async joinChannelReq(@Req() request: Request) {
    let username = request.user.toString();
    let channel = request.body.id;
    let confirmation = await this.chatService.joinChannel(username, channel);
    return confirmation;
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete-channel')
  async removeChannelReq(@Req() request: Request) {
    const confirmation = await this.chatService.removeChannel(request);
  }
}
