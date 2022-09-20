import { Controller, Get, Logger, Req, Res, UseGuards } from '@nestjs/common';
import { Response, Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthorizationGuard } from './auth.guard';
import { HttpService } from '@nestjs/axios';

@Controller('api')
export class AuthController {
  constructor(private request: HttpService, private jwtService: JwtService) {}

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
}
