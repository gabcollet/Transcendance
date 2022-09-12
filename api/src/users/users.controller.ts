import {
  Controller,
  Body,
  Get,
  Post,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.usersService.findById(parseInt(id));

    if (!user) throw new NotFoundException('User not found...');

    return user;
  }

  @Post()
  async createUser(@Body() body: UserDto) {
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
