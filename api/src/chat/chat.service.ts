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
  async getUser(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  }
  async getChannel(id: number) {
    const room = await this.prisma.chatroom.findUnique({
      where: {
        id: id,
      },
    });
    return room;
  }

  async createChannel(body: ChatDto, request: Request) {
    let password = '';

    const user = await this.getUser(request.user.toString());
    if (body.protected === false) {
      password = '';
    } else {
      password = body.password;
    }
    const channel = await this.prisma.chatroom.create({
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
    const join = await this.joinChannel(request.user.toString(), channel.id);
    return channel;
  }

  async joinChannel(username: string, channelID: number) {
    const user = await this.getUser(username);
    const room = await this.getChannel(channelID);
    const connected = await this.prisma.userChatroom.create({
      data: {
        chatroomId: channelID,
        userId: user.id,
      },
    });
    this.logger.log(username + ' joined the channel ' + room.channelName);
    return connected;
  }

  async getChannels(req: Request) {
    const user = await this.getUser(req.user.toString());
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
    const user = await this.getUser(req.user.toString());
    const relation = await this.prisma.userChatroom.deleteMany({
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
  async getPublic(req: Request) {
    const user = await this.getUser(req.user.toString());
    const channels = await this.prisma.chatroom.findMany({
      where: {
        private: false,
        NOT: {
          users: {
            some: {
              user: {
                id: user.id,
              },
            },
          },
        },
      },
    });
    return channels;
  }

  async addMessage(id: number, username: string, message: string) {
    const user = await this.getUser(username);
    const room = await this.getChannel(id);
    const convo = await this.prisma.message.create({
      data: {
        roomId: room.id,
        authorID: user.id,
        messageText: message,
      },
    });
  }
  async getMessages(id: number, username: string) {
    const user = await this.getUser(username);
    const room = await this.getChannel(id);
  }
}
