import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from 'passport-42';
import { User } from './users.entity';
import { Friendship } from './friendship.entity';

enum FriendshipStatus {
  None = 0,
  Requested,
  Received,
  Accepted,
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Friendship) private friendshipRepository: Repository<Friendship>
  ) {}

  private logger = new Logger('User Service');

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findByUsername(username: string): Promise<User> {
    return await this.usersRepository.findOneBy({ username: username }); 
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

  async getAllTimeWins(username: string) {
    const user = await this.usersRepository.findOne({
      where: {username: username }
    });
    return user ? user.wins : null;
  }

  async getAllTimeLosses(username: string) {
    const user = await this.usersRepository.findOne({
      where: {username: username }
    });
    return user ? user.losses : null;
  }


  /* TESTING FUNCTIONS: TO BE DELETED IN PRODUCTION */
  
  // Update user for testing purposes
  async updateImg(username: any) {
    await this.usersRepository.update({
      username: username
    },
    {
      picture: 'http://localhost:3030/users/storedimg/gcollet.jpg',
      wins: 3,
      losses: 2
    });
    return this.findAll();
  }

  async testCreateUsers() {
    await this.usersRepository.insert([
      { username: 'test1' },
      { username: 'test2' },
      { username: 'test3' },
      { username: 'test4' }
    ]);
  }

  async testAddFriends(user: any) {
    const user1 = (await this.findByUsername('laube'));
    const user2 = (await this.findByUsername('test1'));

    const friendship1 = this.friendshipRepository.create({
      sender: user1,
      receiver: user2
    });
    await this.friendshipRepository.save(friendship1);
  }

  async getFriendshipStatus(user1: User, user2: User) {
    let state: FriendshipStatus = 0;
    if (await this.friendshipRepository.findOneBy({
      sender: user1,
      receiver: user2
    })) {
      state += 1;
    }
    if (await this.friendshipRepository.findOneBy({
      sender: user2,
      receiver: user1
    })) {
      state += 2;
    }
    return state;
  }
}
