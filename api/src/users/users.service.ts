import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { User } from './users.entity';
import { Profile } from 'passport-42';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto';

enum FriendshipStatus {
  None = 0,
  Requested,
  Received,
  Accepted,
}

@Injectable()
export class UsersService {
  constructor(
    // @InjectRepository(User) private usersRepository: Repository<User>,
    private prisma: PrismaService
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
  ) {
    const user = await this.prisma.user.create({
      data: {
      intraId,
      displayname,
      username,
      picture,
      wins: 0,
      losses: 0,
      }
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
      where: { username: username }
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

  async getAcceptedFriends(username: string) {
    const user = await this.findByUsername(username);
    // const friendshipList = await this.friendshipRepository.find({
    //   where: {
    //     sender: user
    //   }
    // });

   
    // const fileteredFriendList = friendshipList.filter((friendship) => {
    //   const result = this.getFriendshipStatus(friendship.sender, friendship.receiver);
    //   if (result === FriendshipStatus.Accepted) {
    //     return true;
    //   }
    //   else {
    //     return false;
    //   }
    // });
    // const mappedFriendList = friendshipList.map(friendship => {
    //   const testUser: User = friendship.receiver;
    // });
    // return mappedFriendList;

    const friendshipList = await this.prisma.friendship.findMany({
      where: {
        sender: user.username
      }
    })
    const promises = friendshipList.map(async(friendship) => ({
      value: friendship,
      status: await this.getFriendshipStatus(friendship.sender, friendship.receiver)
    }))
    const preFilteredList = await Promise.all(promises);
    const filteredList = preFilteredList.filter((friendship) => {
      if (friendship.status === FriendshipStatus.Accepted) {
        // console.log(`result: ${friendship.status} | FriendshipStatus: ${FriendshipStatus.Accepted}`);
        // console.log(`True: ${friendship.sender} -> ${friendship.receiver}`);
            return true;
          }
          else {
            // console.log(`False: ${friendship.value.sender} -> ${friendship.value.receiver}`);
            return false;
          }
    })
    const mappedList = filteredList.map((friendship) => friendship.value.receiver)
    console.log(mappedList);
  }
  
  async getFriendshipStatus(user1: string, user2: string) {
    let state: FriendshipStatus = 0;

    if (await this.prisma.friendship.findFirst({
      where: {
        sender: user1,
        receiver: user2
      }
    })) {
        state += 1;
    }
    if (await this.prisma.friendship.findFirst({
      where: {
        sender: user2,
        receiver: user1
      }
    })) {
        state += 2;
    }
    return state;
  }
}
