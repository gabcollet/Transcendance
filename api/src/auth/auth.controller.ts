import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

const CLIENT_ID =
  '3187aa6aec15b19df251d4424b7bc8f7fc761603b4bae21e049ce800e217a812';
const SECRET =
  '94ecaff84914481f0bbd67e14b57bcbd65d8d8ea7f1f5918870e02c9ae4e04dc';

@Controller('api')
export class AuthController {
  @Get('auth')
  login() {
    return;
  }

  @Get('redirect')
  redirect(@Res() response: Response) {
    response.send(200);
  }
}
