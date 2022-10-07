import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy, Profile } from 'passport-42';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private userService: UsersService) {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.SECRET,
      callbackURL: 'http://localhost:3030/auth/redirect',
      scope: ['public'],
    });
  }

  async validate(accessToken, refreshToken, profile: Profile): Promise<User> {
    const user = await this.userService.findCreateUser(profile);
    console.log('In Validate User: ' + user);
    return user;
  }
}
