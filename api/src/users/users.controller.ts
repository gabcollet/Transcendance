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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthorizationGuard } from '../auth/auth.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { UserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Post('createuser')
  async createUser(@Body() body: UserDto) {
    return await this.usersService.create(
      456,
      "LP",
      "lauboiii"
    );
  }
}

//   @Get()
//   getAll() {
//     return this.usersService.findAll();
//   }

//   @Post()
//   async createUser(@Body() body) {
//     console.log(body);
//     return await this.usersService.create(
//       body.intraId,
//       body.displayname,
//       body.username,
//       body.picture,
//       body.wins,
//       body.losses,
//       );
//     }

//   // Get path of user's image from DB
//   @UseGuards(JwtAuthGuard)
//   @Get(':name/img')
//   getUserImg(@Req() req: Request, @Param() params) {
//     return this.usersService.getUserImage(params.name);
//   }

//   // Get displayname of user
//   @UseGuards(JwtAuthGuard)
//   @Get(':name/displayname')
//   getDisplayName(@Req() req: Request, @Param() params) {
//     return this.usersService.getDisplayName(params.name);
//   }

//   // Get online status of user
//   @UseGuards(JwtAuthGuard)
//   @Get(':name/status')
//   getStatus(@Req() req: Request, @Param() params) {
//     return this.usersService.getStatus(params.name);
//   }

//   // Get all time wins of user
//   @UseGuards(JwtAuthGuard)
//   @Get(':name/wins')
//   getAllTimeWins(@Req() req: Request, @Param() params) {
//     return this.usersService.getAllTimeWins(params.name);
//   }
//   // Get all time losses of user
//   @UseGuards(JwtAuthGuard)
//   @Get(':name/losses')
//   getAllTimeLosses(@Req() req: Request, @Param() params) {
//     return this.usersService.getAllTimeLosses(params.name);
//   }

//   // Fetch user image from its directory and return it as a file
//   @Get('storedimg/:name')
//   getFile(@Param() params, @Res() res: Response) {
//     const file = createReadStream(join(process.cwd(), 'img', params.name));
//     file.pipe(res);
//   }
//   // Update user for testing purposes
//   @UseGuards(JwtAuthGuard)
//   @Post('profile/update')
//   updateImg(@Req() req: Request) {
//     return this.usersService.updateImg(req.user);
//   }
// }
