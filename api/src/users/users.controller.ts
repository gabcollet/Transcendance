import { Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getAll() {
        return this.usersService.findAll();
    }

    @Post()
    createUser() {
        return this.usersService.create('jean', 'jean.jpg', 4, 6);
    }
}
