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
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { ChatService } from './chat.service';
import { Request, Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { Chatroom, Message } from '@prisma/client';
import { ChatDto } from './chat.dto';
import { User } from '@prisma/client';
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
  logger: Logger = new Logger('ChatController');

  @UseGuards(JwtAuthGuard)
  @Get('convo')
  async getConvo(@Req() req: Request, @Query() query) {
    if (query.id == null) {
      return [];
    }
    const messages = await this.chatService.getMessages(
      Number(query.id),
      req.user.toString(),
    );
    return messages;
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-channel')
  async createChannelsReq(@Req() request: Request, @Body() body: ChatDto) {
    let channel = await this.chatService.createChannel(body, request);
    return channel;
  }

  @UseGuards(JwtAuthGuard)
  @Get('channels')
  async getChannelsReq(@Req() request: Request) {
    let channels = await this.chatService.getChannels(request);
    return channels;
  }

  @UseGuards(JwtAuthGuard)
  @Post('join-channel')
  async joinChannelReq(@Req() request: Request) {
    let username = request.user.toString();
    let channel = request.body.value;
    let confirmation = await this.chatService.joinChannel(
      username,
      channel,
      false,
    );
    return confirmation;
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete-channel')
  async removeChannelReq(@Req() request: Request) {
    const confirmation = await this.chatService.removeChannel(request);
    return confirmation;
  }

  @UseGuards(JwtAuthGuard)
  @Get('public-channels')
  async getPublicReq(@Req() request: Request) {
    const confirmation = await this.chatService.getPublic(request);
    return confirmation;
  }
}
