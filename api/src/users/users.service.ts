import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { Friendship, User } from '@prisma/client';
import { Profile } from 'passport-42';
import { PrismaService } from '../prisma/prisma.service';
import { UserDto } from './dto';
import * as fs from 'fs';
import { ProfileService } from 'src/profile/profile.service';

enum FriendshipStatus {
  None = 0,
  Requested = 1,
  Received = 2,
  Accepted = 3,
}

@Injectable()
export class UsersService {
  constructor(
    // @InjectRepository(User) private usersRepository: Repository<User>,
    private prisma: PrismaService,
    private profileService: ProfileService,
  ) {}

  private logger = new Logger('User Service');

  async getSearchedUsernames(search: string) {
    if (!search) {
      return [];
    }
    const users = await this.prisma.user.findMany({
      where: {
        username: {
          startsWith: search,
        },
      },
      select: {
        username: true,
      },
    });
    return users;
  }

  async getAllUsernames() {
    const userList = await this.prisma.user.findMany({
      select: {
        username: true,
      },
    });
    return userList;
  }

  async createUser(user: Partial<User>) {
    if (typeof user.picture == 'undefined') {
      user.picture =
        'https://images.unsplash.com/photo-1521985429101-21bed8b75e47?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80';
    }
    if (user.username.includes('<') || user.username.includes('>')) {
      throw 'Username cannot include opening and closing tags';
    }
    const randomDisplayName =
      user.displayname + Date.now().toString().slice(-4);
    const allUsers = await this.getAllUsernames();
    let newUser: User;
    try {
      newUser = await this.prisma.user.create({
        data: {
          intraId: user.intraId,
          displayname: randomDisplayName,
          username: user.username,
          picture: user.picture,
        },
      });
    } catch (error) {
      this.logger.log(
        `*** User could not be created. Error: ${error.code} ***`,
      );
      return newUser;
    }

    await this.prisma.stats.create({
      data: {
        username: user.username,
        rank: allUsers.length + 1,
      },
    });

    await this.prisma.achievements.create({
      data: {
        username: user.username,
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
      this.logger.log('*** User Not Found... Adding New User to Database ***');
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
    return updatedUser;
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });

    return user;
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    return user;
  }

  async getUserStats(username: string) {
    const stats = await this.prisma.stats.findUnique({
      where: { username: username },
    });
    return stats;
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
    const userStats = await this.getUserStats(username);
    return userStats.wins;
  }

  async getAllTimeLosses(username: string) {
    const userStats = await this.getUserStats(username);
    return userStats.losses;
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
        username,
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

  async getFriendRequests(username: string) {
    const user = await this.findByUsername(username);

    const friendshipList = await this.prisma.friendship.findMany({
      where: {
        receiver: user.username,
      },
    });
    const promises = friendshipList.map(async (friendship) => ({
      value: friendship,
      status: await this.getFriendshipStatus(
        friendship.sender,
        friendship.receiver,
        username,
      ),
    }));
    const preFilteredList = await Promise.all(promises);
    const filteredList = preFilteredList.filter((friendship) => {
      if (friendship.status === FriendshipStatus.Received) {
        return true;
      } else {
        return false;
      }
    });
    const friendUsernameList = filteredList.map((friendship) => {
      return friendship.value.sender;
    });
    return friendUsernameList;
  }

  async getFriendshipStatus(
    user1: string,
    user2: string,
    username: string,
  ): Promise<number> {
    let state: FriendshipStatus = 0;

    if (
      await this.prisma.friendship.findFirst({
        where: {
          sender: user1,
          receiver: user2,
        },
      })
    ) {
      if (user1 === username) {
        state += 1;
      } else if (user2 === username) {
        state += 2;
      }
    }
    if (
      await this.prisma.friendship.findFirst({
        where: {
          sender: user2,
          receiver: user1,
        },
      })
    ) {
      if (user1 === username) {
        state += 2;
      } else if (user2 === username) {
        state += 1;
      }
    }
    return state;
  }

  async addFriend(username: string, friendName: string) {
    return this.prisma.friendship.create({
      data: {
        sender: username,
        receiver: friendName,
      },
    });
  }

  async cancelRequest(username: string, friendName: string) {
    return await this.prisma.friendship.delete({
      where: {
        sender_receiver: {
          sender: username,
          receiver: friendName,
        },
      },
    });
  }

  async removeFriend(username: string, friendName: string) {
    // console.log(`username ${username} | friendname: ${friendName}`);
    await this.cancelRequest(username, friendName);
    return await this.prisma.friendship.delete({
      where: {
        sender_receiver: {
          sender: friendName,
          receiver: username,
        },
      },
    });
  }

  async updateDisplayName(username: string, displayName: string) {
    let updatedUser;
    try {
      updatedUser = await this.prisma.user.update({
        where: {
          username: username,
        },
        data: {
          displayname: displayName,
        },
      });
    } catch (error) {
      return error;
    }
    return { code: 'OK' };
  }

  async updateProfilePicture(username: string, picturePath: string) {
    const prevPicFullPath = await this.getUserImage(username);
    await this.updateUser({ picture: picturePath }, username);
    const prevPic = prevPicFullPath.split('/serverimg?img=')[1];
    if (prevPic) {
      fs.unlink('./img/' + prevPic, function (err) {
        if (err) {
          console.error(err);
        }
      });
    }
  }

  async getHistory(username: string) {
    const matchList = await this.prisma.history.findMany({
      where: {
        OR: [
          {
            winner: username,
          },
          {
            loser: username,
          },
        ],
      },
    });
    return matchList;
  }

  async getAchievements(username: string) {
    const achievements = await this.prisma.achievements.findUnique({
      where: { username: username },
    });
    return achievements;
  }

  /*
   ** TEST FUNCTIONS
   */

  // MUST NOT HAVE THESE USERS ALREADY IN THE DATABASE (NO DUPLICATES)
  async testCreateUsers() {
    const userNum = 500;
    var nums = Array.from(Array(userNum).keys());

    for (const n of nums) {
      await this.createUser({
        id: n + 1,
        displayname: 'displayAnon' + n,
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
    await this.createFriendship({ sender: 'anon305', receiver: user });
    await this.createFriendship({ sender: 'anon306', receiver: user });
    await this.createFriendship({ sender: 'anon307', receiver: user });
    await this.createFriendship({ sender: 'anon308', receiver: user });
    await this.createFriendship({ sender: 'anon309', receiver: user });
    await this.createFriendship({ sender: 'anon310', receiver: user });
    await this.createFriendship({ sender: 'anon311', receiver: user });
    await this.createFriendship({ sender: 'anon312', receiver: user });
    await this.createFriendship({ sender: 'anon314', receiver: user });
    await this.createFriendship({ sender: user, receiver: 'anon4' });
  }

  async testDeleteAll() {
    await this.prisma.user.deleteMany({});
    await this.prisma.friendship.deleteMany({});
  }
}
