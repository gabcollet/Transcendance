import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { Profile } from 'passport-42';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  private logger = new Logger('User Service');

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

    const user = await this.usersRepository.findOne({
      where: { username: username },
    });

    if (!user) {
      this.logger.log('*** User Not Found... Adding New User to Database***');
      return this.create(id, username, username, photos[0].value);
    }

    if (user.intraId == id) {
      this.logger.log('Found user: ' + username + ' with id: ' + user.id);
      return user;
    } else {
      throw new UnauthorizedException(
        'Resquesting Client Credentials Mismatch',
      );
    }
  }

  // Profile requests
  async getUserImage(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username: username }
    });
    return user ? user.picture : null;
  }

  async getDisplayName(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username: username }
    });
    return user ? user.displayname : null;
  }

  async getStatus(username: string) {
    const user = await this.usersRepository.findOne({
      where: { username: username }
    });
    return user ? user.status : null;
  }

  async updateImg(username: any) {
    await this.usersRepository.update({
      username: username
    },
    {
      picture: "http://localhost:3030/users/storedimg/gcollet.jpg"
    });
    return this.findAll();
  }
}
