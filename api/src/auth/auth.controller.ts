import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import Passport from 'passport-42';
import { useParams } from 'react-router-dom';

const CLIENT_ID =
  '3187aa6aec15b19df251d4424b7bc8f7fc761603b4bae21e049ce800e217a812';
const SECRET =
  '94ecaff84914481f0bbd67e14b57bcbd65d8d8ea7f1f5918870e02c9ae4e04dc';

@Controller('auth')
export class AuthController {
  //* localhost:3030/auth/login
  @Get('login')
  handleLogin(@Param('code') code: string) {
    return { msg: code };
  }

  //* localhost:3030/auth/redirect
  @Get('redirect')
  handleRedirect() {
    return { msg: 'redirect' };
  }
}
