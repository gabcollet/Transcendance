import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    create(name: string, picture: string, wins: number, losses: number) {
        const user = this.usersRepository.create({ name, picture, wins, losses });

        return this.usersRepository.save(user);
    }

}
