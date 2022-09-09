import { Controller, Body, Get, Post, Param } from '@nestjs/common';
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
        return this.usersService.findById(parseInt(id));
    }

    @Post()
    createUser(@Body() body: any) {
        return this.usersService.create(body.name, body.username, body.picture, body.wins, body.losses);
    }
}
