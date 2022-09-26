import { Controller, Get, Req, Param, UseGuards, Logger } from '@nestjs/common';
import { request } from 'http';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { Request, Response } from 'express';

@Controller('chat')
export class ChatController {
  constructor(private usersService: UsersService) {}
  logger: Logger = new Logger('ChatController');
  @Get('convo')
  getConvo(@Req() req: Request, @Param() params) {
    let convo = {
      messages: [
        {
          author: 'mafortin',
          message: 'test',
        },
        {
          author: 'gcollet',
          message: 'test2',
        },
        {
          author: 'laube',
          message: 'test3',
        },
        {
          author: 'mafortin',
          message: 'a;lskdfjasl;kdfjasl;dfjkasl;dkfjal;ksfjdfl;aksdjf',
        },
      ],
    };
    return convo;
  }

  //   @UseGuards(JwtAuthGuard)
  @Get('channels')
  getChannels(@Req() req: Request) {
    let channels = {
      name: 'test',
      id: 101,
      owner: 'mafortin',
    };
    this.logger.debug(req.user);
    return channels;
  }
}
