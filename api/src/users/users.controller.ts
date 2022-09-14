import {
  Controller,
  Body,
  Get,
  Post,
  Req,
  Param,
  NotFoundException,
  UseGuards
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
import { AuthorizationGuard } from '../auth/auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: Request) {
    return req.user;
  }

  @Post()
  async createUser(@Body() body: UserDto) {
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
}
