import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthorizationGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  private logger = new Logger('Auth Controller');
  //* localhost:3030/auth/login
  // @Get('login')
  // @UseGuards(AuthorizationGuard)
  // async login() {
  //   return;
  // }

  /**
   * * the guard here automatically use the authorization code to generate a token and retur a user
   * * which is stored in the @Res() req: Request
   */
  @Get('redirect')
  @UseGuards(AuthorizationGuard)
  async handleRedirect(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const username = req.user['username'];
    const userID = req.user['id'];
    const payload = { username: username, sub: userID };
    const jwtToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });

    res.cookie('jwtToken', jwtToken, { httpOnly: true });
    this.logger.log(jwtToken);

    res.status(301).redirect('http://localhost:3000/Menu');
  }

  // @Get('user')
}
