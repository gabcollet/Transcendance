import {
  Controller,
  Body,
  Get,
  Post,
  Req,
  Res,
  Param,
  NotFoundException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthorizationGuard } from '../auth/auth.guard';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { UserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // @Get()
  // getAllUsers() {
  //   return this.usersService.getAllUsers();
  // }

  @Get()
  getSearchedUsernames(@Query() query) {
    return this.usersService.getSearchedUsernames(query.search);
  }

  // Get path of user's image from DB
  @UseGuards(JwtAuthGuard)
  @Get(':name/img')
  getUserImg(@Req() req: Request, @Param() params) {
    return this.usersService.getUserImage(params.name);
  }

  //   // Get displayname of user
  @UseGuards(JwtAuthGuard)
  @Get(':name/displayname')
  getDisplayName(@Req() req: Request, @Param() params) {
    return this.usersService.getDisplayName(params.name);
  }

  //   // Get online status of user
  @UseGuards(JwtAuthGuard)
  @Get(':name/status')
  getStatus(@Req() req: Request, @Param() params) {
    return this.usersService.getStatus(params.name);
  }

  // Get all time wins of user
  @UseGuards(JwtAuthGuard)
  @Get(':name/stats')
  getUserStats(@Req() req: Request, @Param() params) {
    return this.usersService.getUserStats(params.name);
  }

  // Get all time wins of user
  @UseGuards(JwtAuthGuard)
  @Get(':name/wins')
  getAllTimeWins(@Req() req: Request, @Param() params) {
    return this.usersService.getAllTimeWins(params.name);
  }

  // Get all time losses of user
  @UseGuards(JwtAuthGuard)
  @Get(':name/losses')
  getAllTimeLosses(@Req() req: Request, @Param() params) {
    return this.usersService.getAllTimeLosses(params.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':name/friendstatus')
  getFrienshipStatus(@Query() query, @Param() params) {
    return this.usersService.getFriendshipStatus(params.name, query.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':name/friends')
  getFriends(@Param() params) {
    return this.usersService.getAcceptedFriends(params.name);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':name/addfriend')
  addFriend(@Query() query, @Param() params) {
    return this.usersService.addFriend(params.name, query.username);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':name/cancelrequest')
  cancelRequest(@Query() query, @Param() params) {
    return this.usersService.cancelRequest(params.name, query.username);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':name/removefriend')
  removeFriend(@Query() query, @Param() params) {
    return this.usersService.cancelRequest(params.name, query.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':name/achievements')
  getAchievements(@Param() params) {
    return this.usersService.getAchievements(params.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':name')
  findByUsername(@Param() params) {
    return this.usersService.findByUsername(params.name);
  }
}
