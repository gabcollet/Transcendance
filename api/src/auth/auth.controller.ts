import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //* localhost:3030/auth/login
  // @Get('login')
  // @UseGuards(AuthorizationGuard)
  // async login() {
  //   return;
  // }

  //* localhost:3030/auth/redirect
  //! the 42 authGuard here will automatically recuperate de authorization code, generate a token
  //! and return a user.
  @Get('redirect')
  @UseGuards(AuthorizationGuard)
  async handleRedirect() {
    console.log('*** IT WORKED ***');
  }

  // @Get('user')
}
