import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { User } from './users.entity';
import { Profile } from 'passport-42';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    // @InjectRepository(User) private usersRepository: Repository<User>,
    private prisma: PrismaService,
  ) {}

  private logger = new Logger('User Service');

  getAllUsers() {
    return this.prisma.user.findMany();
  }

  async create(
    intraId: number,
    displayname: string,
    username: string,
    picture?: string,
    wins?: number,
    losses?: number,
    twoFASecret?: string,
  ) {
    const user = await this.prisma.user.create({
      data: {
        intraId,
        displayname,
        username,
        picture,
        wins: 0,
        losses: 0,
      },
    });

    return user;
  }

  async findCreateUser(profile: Profile) {
    const { id, username, photos } = profile;

    const user = await this.findByUsername(username);

    if (!user) {
      this.logger.log('*** User Not Found... Adding New User to Database***');
      return this.create(parseInt(id), username, username, photos[0].value);
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

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    return user;
  }

  // PROFILE REQUESTS

  async getUserImage(username: string) {
    const user = await this.findByUsername(username);
    return user ? user.picture : null;
  }

  async getDisplayName(username: string) {
    const user = await this.findByUsername(username);
    return user ? user.displayname : null;
  }

  async getStatus(username: string) {
    const user = await this.findByUsername(username);
    return user ? user.status : null;
  }

  async getAllTimeWins(username: string) {
    const user = await this.findByUsername(username);
    return user ? user.wins : null;
  }

  async getAllTimeLosses(username: string) {
    const user = await this.findByUsername(username);
    return user ? user.losses : null;
  }
}
