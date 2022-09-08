import { Injectable } from '@nestjs/common';
import { Profile } from 'passport-42';

@Injectable()
export class UsersService {
  constructor() {}
  findCreateUser(data: Profile) {
    return;
  }
}
