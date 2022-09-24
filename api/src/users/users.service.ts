import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Friendship, User } from '@prisma/client';
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
    private prisma: PrismaService,
  ) {}

  private logger = new Logger('User Service');

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  async getAllUsernames() {
    const userList = await this.prisma.user.findMany({
      select: {
        username: true,
      },
    });
    console.log('This is userlist below');
    console.log(userList);
    return userList;
  }

  // intraId: number,
  // displayname: string,
  // username: string,
  // picture?: string,
  // wins?: number,
  // losses?: number,
  async createUser(user: Partial<User>) {
    if (typeof user.picture == 'undefined') {
      user.picture =
        'https://images.unsplash.com/photo-1521985429101-21bed8b75e47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';
    }
    const newUser = await this.prisma.user.create({
      data: {
        intraId: user.intraId,
        displayname: user.displayname,
        username: user.username,
        picture: user.picture,
        wins: 0,
        losses: 0,
      },
    });

    return newUser;
  }

  async createFriendship(friendship: Partial<Friendship>) {
    const newFriendship = await this.prisma.friendship.create({
      data: {
        sender: friendship.sender,
        receiver: friendship.receiver,
      },
    });

    return friendship;
  }

  async findCreateUser(profile: Profile) {
    const { id, username, photos } = profile;

    const user = await this.findByUsername(username);

    if (!user) {
      this.logger.log('*** User Not Found... Adding New User to Database***');
      return this.createUser({
        intraId: id,
        username: username,
        displayname: username,
        picture: photos[0].value,
      });
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

  async updateUser(user: Partial<User>, username: string) {
    const updatedUser = await this.prisma.user.update({
      where: {
        username: username,
      },
      data: {
        ...user,
        username: undefined,
        id: undefined,
        intraId: undefined,
      },
    });
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

  async getAcceptedFriends(username: string) {
    const user = await this.findByUsername(username);

    const friendshipList = await this.prisma.friendship.findMany({
      where: {
        sender: user.username,
      },
    });
    const promises = friendshipList.map(async (friendship) => ({
      value: friendship,
      status: await this.getFriendshipStatus(
        friendship.sender,
        friendship.receiver,
      ),
    }));
    const preFilteredList = await Promise.all(promises);
    const filteredList = preFilteredList.filter((friendship) => {
      if (friendship.status === FriendshipStatus.Accepted) {
        return true;
      } else {
        return false;
      }
    });
    const friendUsernameList = filteredList.map((friendship) => {
      return friendship.value.receiver;
    });
    return friendUsernameList;
  }

  async getFriendshipStatus(user1: string, user2: string) {
    let state: FriendshipStatus = 0;

    if (
      await this.prisma.friendship.findFirst({
        where: {
          sender: user1,
          receiver: user2,
        },
      })
    ) {
      state += 1;
    }
    if (
      await this.prisma.friendship.findFirst({
        where: {
          sender: user2,
          receiver: user1,
        },
      })
    ) {
      state += 2;
    }
    return state;
  }

  /*
   ** TEST FUNCTIONS
   */

  // MUST NOT HAVE THESE USERS ALREADY IN THE DATABASE (NO DUPLICATES)
  async testCreateUsers() {
    var nums = Array.from(Array(10).keys());

    for await (const n of nums) {
      await this.createUser({
        id: 1000 + (n + 1),
        displayname: 'anon' + n,
        username: 'anon' + n,
      });
    }
  }

  // MUST HAVE ALL THE USERS BELOW ALREADY IN THE DATABASE
  // REPLACE user WITH YOUR 42 USERNAME
  async testCreateFriendships() {
    const user = 'laube';
    await this.createFriendship({ sender: user, receiver: 'anon1' });
    await this.createFriendship({ sender: user, receiver: 'anon2' });
    await this.createFriendship({ sender: 'anon1', receiver: user });
    await this.createFriendship({ sender: 'anon2', receiver: user });
    await this.createFriendship({ sender: 'anon3', receiver: user });
    await this.createFriendship({ sender: user, receiver: 'anon4' });
  }

  async testDeleteAll() {
    await this.prisma.user.deleteMany({});
    await this.prisma.friendship.deleteMany({});
  }

  // REPLACE user WITH YOUR 42 USERNAME
  async testUpdateUser() {
    const user = 'laube';
    const status =
      (await this.getStatus(user)) == 'offline' ? 'online' : 'offline';
    this.updateUser({ status, wins: 4, username: 'SHOULD NOT BE THIS' }, user);
  }
}
