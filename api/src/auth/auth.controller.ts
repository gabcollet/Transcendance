import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthorizationGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //* localhost:3030/auth/login
  @Get('login')
  @UseGuards(AuthorizationGuard)
  async login() {
    return;
  }

  //* localhost:3030/auth/redirect
  @Get('redirect')
  @UseGuards(AuthorizationGuard)
  handleRedirect() {}

  // @Get('user')
}
