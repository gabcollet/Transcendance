import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-42';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private userService: UsersService) {
    super({
      clientID:
        '3187aa6aec15b19df251d4424b7bc8f7fc761603b4bae21e049ce800e217a812',
      secretID:
        '94ecaff84914481f0bbd67e14b57bcbd65d8d8ea7f1f5918870e02c9ae4e04dc',
      callbackURL: 'http://localhost:3000/Menu',
      profileData: {
        id: '',
        username: '',
        imageUrl: '',
      },
    });
  }

  async validateUser(accessToken, refreshToken, profile: Profile) {
    // const user = this.userService.findCreateUser(profile);
    // return await user;
  }
}
