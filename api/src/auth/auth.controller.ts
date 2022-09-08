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
