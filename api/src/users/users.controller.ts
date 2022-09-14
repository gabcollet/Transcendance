import {
  Controller,
  Body,
  Get,
  Post,
  Req,
  Res,
  Param,
  NotFoundException,
  UseGuards
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { AuthorizationGuard } from '../auth/auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  
  @Post()
  async createUser(@Body() body) {
    console.log(body);
    return await this.usersService.create(
      body.intraId,
      body.displayname,
      body.username,
      body.picture,
      body.wins,
      body.losses,
      );
    }

  // Get path of user's image from DB
  @UseGuards(JwtAuthGuard)
  @Get(':name/img')
  getUserImg(@Req() req: Request, @Param() params) {
    return this.usersService.getUserImage(params.name);
  }
  
  // Get path of user's image from DB
  @UseGuards(JwtAuthGuard)
  @Get(':name/displayname')
  getDisplayName(@Req() req: Request, @Param() params) {
    return this.usersService.getDisplayName(params.name);
  }

  // Fetch user image from its directory and return it as a file
  @Get('storedimg/:name')
  getFile(@Param() params, @Res() res: Response) {
    const file = createReadStream(join(process.cwd(), 'img', params.name));
    file.pipe(res);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('profile/update')
  updateImg(@Req() req: Request) {
    return this.usersService.updateImg(req.user);
  }
}
