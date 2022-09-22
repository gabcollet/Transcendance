import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
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

  async createUser(
    intraId: number,
    displayname: string,
    username: string,
    picture?: string,
    wins?: number,
    losses?: number,
  ) {
    if (typeof picture == "undefined") {
      picture = "https://images.unsplash.com/photo-1521985429101-21bed8b75e47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    }
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

  async createFriendship(
    sender: string,
    receiver: string
  ) {
    const friendship = await this.prisma.friendship.create({
      data: {
        user1: {
            username: sender,
        },
      },
    });

    return friendship;
  }

  async findCreateUser(profile: Profile) {
    const { id, username, photos } = profile;

    const user = await this.findByUsername(username);

    if (!user) {
      this.logger.log('*** User Not Found... Adding New User to Database***');
      return this.createUser(parseInt(id), username, username, photos[0].value);
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
    console.log(`findbyusername: ${username}`);
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
            return true;
          }
          else {
            return false;
          }
    })
    const friendUsernameList = filteredList.map((friendship) => {
      return friendship.value.receiver;
    })
    return friendUsernameList;
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

  // TEST FUNCTIONS
  async testCreateUsers() {
    this.createUser(9001, "anon1", "anon1");
    this.createUser(9002, "anon2", "anon2");
    this.createUser(9003, "anon3", "anon3");
    this.createUser(9004, "anon4", "anon4");
    this.createUser(9004, "anon5", "anon5");
  }

  async testCreateFriendships() {
    this.createFriendship(await this.findByUsername("laube"), this.findByUsername("anon1"));
    this.createFriendship("laube", "anon2");
    this.createFriendship("anon1", "laube");
    this.createFriendship("anon2", "laube");
    this.createFriendship("anon3", "laube");
    this.createFriendship("laube", "anon4");
  }
}
