import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { ChatDto } from './chat.dto';
import { User } from '@prisma/client';
import { from, lastValueFrom } from 'rxjs';
import { Request } from 'express';
import { runInThisContext } from 'vm';
import { connected } from 'process';
import { authorize, use } from 'passport';
import { AuthService } from 'src/auth/auth.service';
import { networkInterfaces } from 'os';
import { UpdateDateColumn } from 'typeorm';
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
    if (!room || !user) return false;
    const restriction = await this.prisma.restricted.findUnique({
      where: {
        restrictionRoomId_restrictionUserId: {
          restrictionRoomId: room.id,
          restrictionUserId: user.id,
        },
      },
    });
    this.logger.log(restriction);
    if (restriction) {
      this.logger.log('USER ' + user.username + ' IS BANNED');
      return false;
    }
    if (room.protected === true && authorized === false) {
      return false;
    }
    const connected = await this.prisma.userChatroom.create({
      data: {
        chatroomId: channelID,
        userId: user.id,
        isOwner: creator,
        isAdmin: creator,
        joined: true,
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
        joined: true,
      },
      include: {
        chatroom: true,
      },
    });
    return channels;
  }

  //https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#disconnect-a-related-record
  async removeChannel(roomId: number, username: string) {
    const user = await this.getUser(username);
    if (!user) return false;
    const relation = await this.prisma.userChatroom.delete({
      where: {
        chatroomId_userId: {
          chatroomId: roomId,
          userId: user.id,
        },
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
        joined: true,
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

  async getAdmin(username: string, roomID: number) {
    let isAdmin: boolean;
    const user = await this.getUser(username);
    if (user) {
      const admin = await this.prisma.userChatroom.findFirst({
        where: {
          chatroomId: roomID,
          userId: user.id,
          isAdmin: true,
        },
      });
      if (admin) {
        return true;
      }
    }
    return false;
  }

  async giveAdmin(username: string, roomID: number) {
    const confirm = await this.prisma.userChatroom.updateMany({
      where: {
        chatroom: {
          id: roomID,
        },
        user: {
          username: username,
        },
      },
      data: {
        isAdmin: true,
      },
    });
    return confirm;
  }

  async getDmId(target: string, username: string) {
    const dms = await this.prisma.chatroom.findFirst({
      where: {
        isDM: true,
        users: {
          some: {
            user: {
              username: { in: [username, target] },
            },
          },
        },
      },
      include: {
        users: true,
      },
    });
    return dms;
  }

  async createDm(target: string, username: string) {
    const channel = await this.prisma.chatroom.create({
      data: {
        channelName: target + ' & ' + username,
        protected: false,
        password: '',
        private: true,
        isDM: true,
      },
    });
    const join = await this.joinChannel(username, channel.id, false, true);
    const join2 = await this.joinChannel(target, channel.id, false, true);
    return channel.id;
  }

  async validateRestriction(user: string, target: string, chatroom: number) {
    const userAdmin = await this.getAdmin(user, chatroom);
    if (userAdmin === false) {
      this.logger.debug('USER NOT ADMIN');
      return false;
    }
    const targetAdmin = await this.getAdmin(target, chatroom);
    if (targetAdmin === true) {
      this.logger.debug('TARGET IS ADMIN');
      return false;
    }
    return true;
  }

  async giveRestriction(
    target: string,
    chatroomId: number,
    type: string,
    time: number,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: target,
      },
    });
    if (!user) return false;
    const user_chatroom = await this.prisma.userChatroom.findUnique({
      where: {
        chatroomId_userId: {
          userId: user.id,
          chatroomId: chatroomId,
        },
      },
    });
    if (!user_chatroom) return false;
    const already = await this.prisma.restricted.findUnique({
      where: {
        restrictionRoomId_restrictionUserId: {
          restrictionRoomId: user_chatroom.chatroomId,
          restrictionUserId: user.id,
        },
      },
    });
    if (already) {
      this.logger.log('USER ALREADY BANNED');
      return false;
    }
    const restrict = await this.prisma.restricted.create({
      data: {
        restrictionRoomId: chatroomId,
        restrictionUserId: user.id,
        type: type,
        timer: time,
      },
    });
    if (type === 'ban') {
      const banning = this.handleBan(user.id, chatroomId);
    }
    return true;
  }
  async handleBan(targetId: number, chatroomId: number) {
    const user_chatroom = await this.prisma.userChatroom.update({
      where: {
        chatroomId_userId: {
          userId: targetId,
          chatroomId: chatroomId,
        },
      },
      data: {
        joined: false,
      },
    });
  }
}
