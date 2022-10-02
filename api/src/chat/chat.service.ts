import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { ChatDto } from './chat.dto';
import { User } from '@prisma/client';
import { from, lastValueFrom } from 'rxjs';
import { Request } from 'express';
import { runInThisContext } from 'vm';
import { connected } from 'process';

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
    let join = await this.joinChannel(request.user.toString(), channel.id);
    return channel;
  }

  async joinChannel(username: string, channelID: number) {
    let user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    let room = await this.prisma.chatroom.findUnique({
      where: {
        id: channelID,
      },
    });
    let connected = await this.prisma.userChatroom.create({
      data: {
        chatroomId: channelID,
        userId: user.id,
      },
    });
    this.logger.log(username + ' joined the channel ' + room.channelName);
    return connected;
  }

  async getChannels(req: Request) {
    let user = await this.prisma.user.findUnique({
      where: {
        username: req.user.toString(),
      },
    });
    const channels = await this.prisma.userChatroom.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
      include: {
        chatroom: true,
      },
    });
    return channels;
  }

  //https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#disconnect-a-related-record
  async removeChannel(req: Request) {
    let user = await this.prisma.user.findUnique({
      where: {
        username: req.user.toString(),
      },
    });
    let relation = await this.prisma.userChatroom.deleteMany({
      where: {
        AND: [
          {
            chatroom: {
              id: req.body.value,
            },
            user: {
              id: user.id,
            },
          },
        ],
      },
    });
    return relation;
  }

  //   async getPublic();
}
