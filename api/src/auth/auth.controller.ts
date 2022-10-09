import {
  Controller,
  Get,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthorizationGuard } from './auth.guard';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
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
    const jwtToken = this.authService.generateJwtToken(req);

    //* Add the token to browser cookies
    //! httpOnly: true makes the cookie unaccessible from the Frontend.
    res.cookie('jwtToken', jwtToken, { httpOnly: false });

    if (req.user['twoFAEnabled'] === false) {
      res.status(301).redirect('http://localhost:3000/Menu');
    } else {
      req.user['twoFASecret']
        ? res.status(301).redirect('http://localhost:3000/TwoFA/verify')
        : res.status(301).redirect('http://localhost:3000/TwoFA');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('TwoFA/toggle')
  async TwoFA_Activate(@Req() req: Request) {
    return this.authService.toggleTwoFA(req.cookies['jwtToken']);
  }

  @UseGuards(JwtAuthGuard)
  @Get('TwoFA/pair')
  async TwoFA_QR_Code(@Req() req: Request) {
    const jwtToken = this.jwtService.decode(req.cookies['jwtToken']);
    const username = jwtToken['username'];

    //* Generates a secret for the Authenticator App and updates the user in the DB with the secret
    const secret = await this.authService.genTwoFASecret(username);

    // //* Generates a Google Authenticator compatible qrcode for the user to scan
    const img = await this.authService.genQRCode(secret.otpauth_url);
    return img;
  }

  @UseGuards(JwtAuthGuard)
  @Post('TwoFA/verify')
  async verify2FA(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const pin = req.body['pin'];
    const verified = await this.authService.twoFAVerify(
      req.cookies['jwtToken'],
      pin,
    );

    return verified;
  }
}
