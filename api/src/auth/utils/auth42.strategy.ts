import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport';
import { Strategy } from 'passport-42';
import { UsersController } from 'src/users/users.controller';

const CLIENT_ID =
  '3187aa6aec15b19df251d4424b7bc8f7fc761603b4bae21e049ce800e217a812';
const SECRET =
  '94ecaff84914481f0bbd67e14b57bcbd65d8d8ea7f1f5918870e02c9ae4e04dc';

@Injectable()
export class Auth42Strategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      clientID: CLIENT_ID,
      clientSecret: SECRET,
      callbackURL: 'http://localhost:3000/auth/login',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
  }
}
