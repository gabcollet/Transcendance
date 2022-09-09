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

    findById(id: number) {
        return this.usersRepository.findOneBy({id});
    }

    // getImage(id: number) {
    //     return 
    // }

    create(name: string, username: string, picture: string, winssss: number, losses: number) {
        const user = this.usersRepository.create({ name, username, picture, winssss, losses });

        return this.usersRepository.save(user);
    }

}
