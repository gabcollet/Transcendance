import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-42';
import { UserDto } from 'src/users/dto/user.dto';
import { User } from 'src/users/users.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private userService: UsersService) {
    super({
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: 'http://localhost:3030/auth/redirect',
      scope: ['public'],
    });
  }

  async validate(accessToken, refreshToken, profile: Profile) {
    const user = this.userService.findCreateUser(profile);

    return await user;
  }
}