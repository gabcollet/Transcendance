import {
  Controller,
  Get,
  Logger,
  Param,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthorizationGuard } from './auth.guard';
// import { HttpService } from '@nestjs/axios';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    // private request: HttpService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  private logger = new Logger('Auth Controller');
  //* localhost:3030/auth/login
  @Get('login')
  @UseGuards(AuthorizationGuard)
  async login() {
    return;
  }

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

    //* Infomation to put inside the token
    const payload = { username: username, userID: userID };
    const jwtToken = await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });

    //* Add the token to browser cookies
    res.cookie('jwtToken', jwtToken, { httpOnly: false }); //! httpOnly: true makes the cookie unaccessible from the Frontend.
    res.cookie('logged', true, { httpOnly: false });

    if (req.user['twoFAEnabled'] === false)
      res.status(301).redirect('http://localhost:3000/Menu');
    else res.status(301).redirect('http://localhost:3000/TwoFA');
  }

  @Get('TwoFA')
  async TwoFA_QR_Code(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    //* Retrieve info from cookie
    const jwtToken = this.jwtService.decode(req.cookies['jwtToken']);

    //* Generate a secret for the 2FA authenticator
    const twoFaSecret = speakeasy.generateSecret({
      name: 'Transcendence',
    });

    //* Add Generated Secrets to cookies
    res.cookie('TwoFA', twoFaSecret, { httpOnly: true });

    const secret = twoFaSecret['ascii'];
    console.log('SECRET\n' + secret);

    //* update user with generated 2FA Secret for validation
    await this.userService.updateUser(
      { twoFAEnabled: true, twoFASecret: secret },
      jwtToken['username'],
    );

    //* Generates a Google Authenticator compatible qrcode for the user to scan
    const img = await qrcode.toDataURL(twoFaSecret['otpauth_url']);

    res.cookie('qrcode', img, { httpOnly: false });
    res.status(301).redirect('http://localhost:3000/TwoFA');
  }

  @Get('TwoFA:pin')
  verify2FA(
    @Param('pin') pin: string,

    @Res({ passthrough: true }) res: Response,
  ) {}
}
