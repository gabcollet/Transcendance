import {
  Controller,
  Get,
  Req,
  UseGuards,
  Logger,
  Body,
  Post,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { ChatService } from './chat.service';
import { Request } from 'express';
import { ChatDto, PasswordDto } from './chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}
  logger: Logger = new Logger('ChatController');

  @UseGuards(JwtAuthGuard)
  @Get('convo')
  async getConvo(@Req() req: Request, @Query() query) {
    if (!query.id || query.id === '0') {
      return [];
    }
    this.logger.debug('ROOM ID = ' + query.id);
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
  @Post('invite-channel')
  async inviateChannel(@Req() request: Request, @Body() body) {
    if (!body.friend || !body.roomID || !request.user) return false;
    const username = request.user.toString();
    const isAdmin = await this.chatService.getAdmin(username, body.roomID);
    if (isAdmin === false) return false;
    await this.chatService.joinChannel(body.friend, body.roomID, false, true);
    this.logger.log(' PLAYER ' + request.user + ' INVITED TO CHANNEL');
    return true;
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
      false,
    );
    return confirmation;
  }

  @UseGuards(JwtAuthGuard)
  @Post('delete-channel')
  async removeChannelReq(@Req() request: Request) {
    if (!request.user || !request.body.value) {
      return false;
    }
    this.logger.debug(request.body.value, request.user.toString());
    const confirmation = await this.chatService.removeChannel(
      request.body.value,
      request.user.toString(),
    );
    return confirmation;
  }

  @UseGuards(JwtAuthGuard)
  @Get('public-channels')
  async getPublicReq(@Req() request: Request) {
    const confirmation = await this.chatService.getPublic(request);
    return confirmation;
  }
  @UseGuards(JwtAuthGuard)
  @Get('members')
  async roomMembers(@Req() request: Request, @Query() query) {
    if (!query.id) return false;
    const members = this.chatService.getMembers(Number(query.id));
    return members;
  }

  @UseGuards(JwtAuthGuard)
  @Get('join-password')
  async joinPassword(@Req() request: Request, @Query() query) {
    const confirm = await this.chatService.confirmPassword(
      Number(query.id),
      query.password,
      request.user.toString(),
    );
    if (confirm === true) {
      return 'confirmed';
    } else {
      throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('friends')
  async friendList(@Req() request: Request) {
    const list = await this.chatService.getFriendList(request.user.toString());
    return list;
  }

  @UseGuards(JwtAuthGuard)
  @Get('is-admin')
  async isAdmin(@Query() query) {
    if (!query.id || query.username) return false;
    const confirmation = await this.chatService.getAdmin(
      query.username,
      Number(query.id),
    );
    return confirmation;
  }

  @UseGuards(JwtAuthGuard)
  @Post('give-admin')
  async giveAdmin(@Req() req) {
    if (!req.body.chatroom || !req.body.username) return false;
    const isAdmin = await this.chatService.getAdmin(
      req.user.toString(),
      req.body.chatroom,
    );
    if (isAdmin === true) {
      const confirmation = await this.chatService.giveAdmin(
        req.body.username,
        req.body.chatroom,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('is-restricted')
  async isRestricted(@Query() query) {
    console.log(query);
    if (!query.author || !query.chatroom) return false;
    const user = await this.chatService.getUser(query.author);
    if (!user) return false;
    const status = await this.chatService.checkRestriction(
      user.id,
      Number(query.chatroom),
      query.type,
    );
    return status;
  }

  @UseGuards(JwtAuthGuard)
  @Post('kick-user')
  async kickUser(@Req() req) {
    if (!req.user || !req.body || !req.body.username || !req.body.chatroom)
      return false;
    const username = req.user.toString();
    const target = req.body.username;
    const chatroom = req.body.chatroom;
    const kickRight = await this.chatService.validateRestriction(
      username,
      target,
      chatroom,
      true,
    );
    const targetUser = await this.chatService.getUser(target);
    if (!targetUser) return false;
    if (kickRight === true) {
      this.chatService.handleBan(targetUser.id, chatroom);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('ban-mute')
  async banMuteUser(@Req() req) {
    const username = req.user.toString();
    const target = req.body.username;
    const chatroom = req.body.chatroom;
    const time = req.body.time;
    if (!target || !username || !chatroom || !time || !req.body.type) {
      return false;
    }
    const banRight = await this.chatService.validateRestriction(
      username,
      target,
      chatroom,
      true,
    );
    if (banRight === true) {
      const confirm = await this.chatService.giveRestriction(
        target,
        chatroom,
        req.body.type,
        time,
      );
      if (confirm === false) {
        return false;
      }
    }
    this.logger.debug('USER RESTRICTED : ' + req.body.type);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Post('mute')
  async muteUser(@Req() req) {
    const username = req.user.toString();
    const target = req.body.username;
    const chatroom = req.body.chatroom;
    const time = req.body.time;
    if (!target || !username || !chatroom || !time) {
      return false;
    }
    const muteRight = await this.chatService.validateRestriction(
      username,
      target,
      chatroom,
      true,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('dm')
  async dmRequest(@Req() req, @Query() query) {
    const user = req.user.toString();
    if (!user || !query || !query.target) return false;
    if ((await this.chatService.isBlocked(user, query.target)) === true)
      return false;
    const exist = await this.chatService.getDmId(user, query.target);
    if (!exist) {
      //create and join if dm doesnt exist
      const response = await this.chatService.createDm(user, query.target);
      return response;
    }
    return exist.id;
  }
  @UseGuards(JwtAuthGuard)
  @Get('is-owner')
  async isOwner(@Req() req, @Query() query) {
    if (!query.chatroom) return false;
    const username = req.user.toString();
    const owner = await this.chatService.checkOwer(
      username,
      Number(query.chatroom),
    );
    return owner;
  }

  @UseGuards(JwtAuthGuard)
  @Post('remove-password')
  async removePassword(@Req() req) {
    if (!req.body || !req.body.chatroom) return false;
    const chatroom = Number(req.body.chatroom);
    const verification = await this.chatService.isOwner(
      req.user.toString(),
      chatroom,
    );
    if (verification === false) return false;
    const removed = this.chatService.removePassword(chatroom);
    return true;
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Req() req, @Body() body: PasswordDto) {
    const chatroom = Number(req.body.chatroom);
    const verification = await this.chatService.isOwner(
      req.user.toString(),
      chatroom,
    );
    if (verification === false) return false;
    const changed = this.chatService.changePassword(chatroom, body.password);
  }
}
