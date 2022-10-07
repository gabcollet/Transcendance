import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { ChatDto } from './chat.dto';
import { User } from '@prisma/client';
import { from, lastValueFrom } from 'rxjs';
import { Request } from 'express';
import { runInThisContext } from 'vm';
import { connected } from 'process';
import { authorize } from 'passport';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private AuthService: AuthService,
    private userService: UsersService,
  ) {}
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
      password = await this.AuthService.hashPassword(body.password);
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
    const join = await this.joinChannel(
      request.user.toString(),
      channel.id,
      true,
      true,
    );
    return channel;
  }

  async joinChannel(
    username: string,
    channelID: number,
    creator: boolean,
    authorized: boolean,
  ) {
    const room = await this.getChannel(channelID);
    const user = await this.getUser(username);
    if (room.protected === true && authorized === false) {
      return false;
    }
    const connected = await this.prisma.userChatroom.create({
      data: {
        chatroomId: channelID,
        userId: user.id,
        isOwner: creator,
      },
    });
    this.logger.log(username + ' joined the channel ' + room.channelName);
    return true;
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
    const messagesDB = await this.prisma.message.findMany({
      where: {
        room: room,
      },
      orderBy: {
        sentAt: 'asc',
      },
      include: {
        author: true,
      },
    });
    let messages = messagesDB.map((single) => {
      return {
        author: single.author.username,
        msg: single.messageText,
        chatRoom: single.roomId,
        sentAt: single.sentAt,
      };
    });
    return messages;
  }
  async confirmPassword(id: number, password: string, username: string) {
    let confirm = await this.AuthService.validatePassword(id, password);
    if (confirm === true) {
      const join = await this.joinChannel(username, id, false, true);
      return true;
    } else {
      return false;
    }
  }
  async getMembers(id: number) {
    let members = await this.prisma.userChatroom.findMany({
      where: {
        chatroom: {
          id: id,
        },
      },
      include: {
        user: true,
      },
    });
    let ret = members.map((member) => {
      return member.user.username;
    });
    return ret;
  }

  async getFriendList(username: string) {
    let list = await this.userService.getAcceptedFriends(username);
    return list;
  }
}
