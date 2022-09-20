import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthorizationGuard } from './auth.guard';
import { HttpService } from '@nestjs/axios';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private request: HttpService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  private logger = new Logger('Auth Controller');
  //* localhost:3030/auth/login
  // @Get('login')
  // @UseGuards(AuthorizationGuard)
  // async login() {
  //   return;
  // }

  /**
   * * the guard here automatically use the authorization code to generate a token and return a user
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
    const payload = { username: username, userID: userID };
    const jwtToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });
    res.cookie('jwtToken', jwtToken, { httpOnly: false }); //! httpOnly: true makes the cookie unaccessible from the Frontend.
    res.cookie('logged', true, { httpOnly: false });
    this.logger.log(jwtToken);

    res.status(301).redirect('http://localhost:3000/Menu');
  }

  @Get('TwoFA')
  // @UseGuards(AuthGuard('jwt'))
  async TwoFA_QR_Code(@Req() req: Request) {
    const jwtToken = this.jwtService.decode(req.cookies['jwtToken']);
    await this.userService.patchUser(
      { twoFAEnabled: true },
      jwtToken['username'],
    );

    const secret = speakeasy.generateSecret({
      name: 'Transcendence',
    });

    qrcode.toDataURL(secret.otpauth_url, (err, img) => {
      if (err) throw err;
      console.log(img);
    });
    console.log(secret);
  }
}
