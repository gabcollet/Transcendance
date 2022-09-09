import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-42';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private userService: UsersService) {
    super({
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: 'http://localhost:3030/auth/login',
      scope: ['public'],
    });
  }

  async validate(accessToken, refreshToken, profile: Profile) {
    console.log(' ***** INSIDE VALIDATE *****');

    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);

    // const user = this.userService.findCreateUser(profile);
    // return await user;
  }
}
