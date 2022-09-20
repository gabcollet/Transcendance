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
    private prisma: PrismaService
  ) {}

  getAllUsers() {
    return { msg: 'These are all the users' };
  }

  async createUser(user: UserDto) {
    console.log(user);
    const newUser = await this.prisma.user.create({
      data: {
        id: user.id,
        intraId: user.intraId,
        username: user.username,
        displayname: user.displayname,
        picture: user.picture,
        status: user.status,
        wins: user.wins,
        losses: user.losses
      }
    })
  }

  findCreateUser(arg: any) {
    return { msg: 'FindCreateUser placeholder' };
  }
}

//   private logger = new Logger('User Service');

//   findAll(): Promise<User[]> {
//     return this.usersRepository.find();
//   }

//   findById(id: number) {
//     return this.usersRepository.findOneBy({ id });
//   }

//   create(
//     intraId: number,
//     displayname: string,
//     username: string,
//     picture: string,
//     wins?: number,
//     losses?: number,
//   ) {
//     const user = this.usersRepository.create({
//       intraId,
//       displayname,
//       username,
//       picture,
//       wins: 0,
//       losses: 0,
//     });

//     return this.usersRepository.save(user);
//   }

//   async findCreateUser(profile: Profile) {
//     const { id, username, photos } = profile;

//     const user = await this.usersRepository.findOne({
//       where: { username: username },
//     });

//     if (!user) {
//       this.logger.log('*** User Not Found... Adding New User to Database***');
//       return this.create(id, username, username, photos[0].value);
//     }

//     if (user.intraId == id) {
//       this.logger.log('Found user: ' + username + ' with id: ' + user.id);
//       return user;
//     } else {
//       throw new UnauthorizedException(
//         'Resquesting Client Credentials Mismatch',
//       );
//     }
//   }

//   // Profile requests
//   async getUserImage(username: string) {
//     const user = await this.usersRepository.findOne({
//       where: { username: username }
//     });
//     return user ? user.picture : null;
//   }

//   async getDisplayName(username: string) {
//     const user = await this.usersRepository.findOne({
//       where: { username: username }
//     });
//     return user ? user.displayname : null;
//   }

//   async getStatus(username: string) {
//     const user = await this.usersRepository.findOne({
//       where: { username: username }
//     });
//     return user ? user.status : null;
//   }

//   async getAllTimeWins(username: string) {
//     const user = await this.usersRepository.findOne({
//       where: {username: username }
//     });
//     return user ? user.wins : null;
//   }

//   async getAllTimeLosses(username: string) {
//     const user = await this.usersRepository.findOne({
//       where: {username: username }
//     });
//     return user ? user.losses : null;
//   }

//   async updateImg(username: any) {
//     await this.usersRepository.update({
//       username: username
//     },
//     {
//       picture: "http://localhost:3030/users/storedimg/gcollet.jpg",
//       wins: 3,
//       losses: 2
//     });
//     return this.findAll();
//   }
// }
