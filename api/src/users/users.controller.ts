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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthorizationGuard } from '../auth/auth.guard';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { extname, join } from 'path';
import { UserDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PongService } from 'src/pong/pong.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private pongService: PongService,
  ) {}

  // @Get()
  // getAllUsers() {
  //   return this.usersService.getAllUsers();
  // }

  @Get()
  async getSearchedUsernames(@Query() query) {
    return await this.usersService.getSearchedUsernames(query.search);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':name/serverimg')
  async getServerImg(@Param() params, @Query() query, @Res() res) {
    await res.sendFile(query.img, { root: 'img' });
  }

  // Get path of user's image from DB
  @UseGuards(JwtAuthGuard)
  @Get(':name/img')
  async getUserImg(@Req() req: Request, @Param() params) {
    return await this.usersService.getUserImage(params.name);
  }

  //   // Get displayname of user
  @UseGuards(JwtAuthGuard)
  @Get(':name/displayname')
  async getDisplayName(@Req() req: Request, @Param() params) {
    return await this.usersService.getDisplayName(params.name);
  }

  //   // Get online status of user
  @UseGuards(JwtAuthGuard)
  @Get(':name/status')
  async getStatus(@Req() req: Request, @Param() params) {
    return await this.usersService.getStatus(params.name);
  }

  // Get all time wins of user
  @UseGuards(JwtAuthGuard)
  @Get(':name/stats')
  async getUserStats(@Req() req: Request, @Param() params) {
    return await this.usersService.getUserStats(params.name);
  }

  // Get all time wins of user
  @UseGuards(JwtAuthGuard)
  @Get(':name/wins')
  async getAllTimeWins(@Req() req: Request, @Param() params) {
    return await this.usersService.getAllTimeWins(params.name);
  }

  // Get all time losses of user
  @UseGuards(JwtAuthGuard)
  @Get(':name/losses')
  async getAllTimeLosses(@Req() req: Request, @Param() params) {
    return await this.usersService.getAllTimeLosses(params.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':name/friendstatus')
  async getFrienshipStatus(@Query() query, @Param() params) {
    return await this.usersService.getFriendshipStatus(
      params.name,
      query.username,
      params.name,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':name/friends')
  async getFriends(@Param() params) {
    return await this.usersService.getAcceptedFriends(params.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':name/friendrequests')
  async getFriendRequests(@Param() params) {
    return await this.usersService.getFriendRequests(params.name);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':name/addfriend')
  async addFriend(@Query() query, @Param() params) {
    return await this.usersService.addFriend(params.name, query.username);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':name/cancelrequest')
  async cancelRequest(@Query() query, @Param() params) {
    return await this.usersService.cancelRequest(params.name, query.username);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':name/removefriend')
  async removeFriend(@Query() query, @Param() params) {
    return await this.usersService.removeFriend(params.name, query.username);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':name/config/displayname')
  async updateDisplayName(@Query() query, @Param() params) {
    return await this.usersService.updateDisplayName(
      params.name,
      query.displayname,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Post(':name/config/picture')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './img',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    }),
  )
  async updateProfilePicture(
    @Param() params,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.usersService.updateProfilePicture(
      params.name,
      'http://localhost:3030/users/' +
        params.name +
        '/serverimg?img=' +
        file.filename,
    );
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':name/history')
  async getHistory(@Param() params) {
    return await this.usersService.getHistory(params.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':name/achievements')
  async getAchievements(@Param() params) {
    return await this.usersService.getAchievements(params.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':name/block')
  async blockUser(@Req() req: Request, @Param() params) {
    return await this.usersService.blockUser(req.user as string, params.name);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':name')
  async findByUsername(@Param() params) {
    return await this.usersService.findByUsername(params.name);
  }
}
