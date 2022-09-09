import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { Profile } from 'passport-42';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findById(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  create(
    intraId: number,
    displayname: string,
    username: string,
    picture: string,
    wins?: number,
    losses?: number,
  ) {
    const user = this.usersRepository.create({
      intraId,
      displayname,
      username,
      picture,
      wins: 0,
      losses: 0,
    });

    return this.usersRepository.save(user);
  }

  async findCreateUser(profile: Profile) {
    const { id, username, photos } = profile;
    console.log('USERNAME: ' + username);

    const user = await this.usersRepository.findOne({
      where: { username: username },
    });

    if (!user) {
      console.log('*** User Not Found... Adding User to Database***');
      return this.create(id, username, username, photos[0]);
    }

    console.log('Found user with id: ' + user.id);
    return user;
  }
}
