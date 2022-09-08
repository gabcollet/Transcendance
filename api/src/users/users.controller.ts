import { Controller, Body, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getAll() {
        return this.usersService.findAll();
    }

    @Post()
    createUser(@Body() body: any) {
        return this.usersService.create(body.name, body.picture, body.wins, body.losses);
    }
}
