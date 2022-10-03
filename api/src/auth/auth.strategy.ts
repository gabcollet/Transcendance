import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy, Profile } from 'passport-42';
// import { UserDto } from 'src/users/dto/user.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private userService: UsersService) {
    super({
      clientID: process.env.CLIENT_ID,
      // clientID:
      //   '3187aa6aec15b19df251d4424b7bc8f7fc761603b4bae21e049ce800e217a812',
      clientSecret: process.env.SECRET,
      callbackURL: 'http://localhost:3030/auth/redirect',
      scope: ['public'],
    });
  }

  async validate(accessToken, refreshToken, profile: Profile): Promise<User> {
    const user = this.userService.findCreateUser(profile);
    // console.log(user);
    return await user;
  }
}
