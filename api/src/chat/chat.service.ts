import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { ChatDto } from './chat.dto';
import { User } from '@prisma/client';
import { from, lastValueFrom } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}
  logger: Logger = new Logger('ChatController');
  async createChannel(body: ChatDto, request: Request) {
    let password = '';

    let user = await this.prisma.user.findUnique({
      where: {
        username: request.user.toString(),
      },
    });
    if (body.protected === false) {
      password = '';
    } else {
      password = body.password;
    }
    let channel = await this.prisma.chatroom.create({
      data: {
        channelName: body.name,

        members: {
          connect: {
            id: user.id,
          },
        },

        admin: {
          connect: {
            id: user.id,
          },
        },

        protected: body.protected,
        password: password,
        private: body.checked,
        isDM: false,
      },
    });
    return channel;
  }
  async getChannels(req: Request) {
    let user = await this.prisma.user.findUnique({
      where: {
        username: req.user.toString(),
      },
    });
    let value = await this.prisma.chatroom.findMany({
      where: {
        members: {
          every: {
            username: user.username,
          },
        },
      },
    });
    return value;
  }
}
