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

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  // @UseGuards(AuthorizationGuard)
  getProfile() {
    console.log("IT WORKS");
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   const user = this.usersService.findById(parseInt(id));

  //   if (!user) throw new NotFoundException('User not found...');

  //   return user;
  // }

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
}
