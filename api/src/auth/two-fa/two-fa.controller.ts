import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import speakeasy from 'speakeasy';
const qrcode = require('qrcode');

@Controller('api')
export class TwoFaController {
  constructor(private request: HttpService, private jwtService: JwtService) {}

  @Get('TwoFA')
  // @UseGuards(AuthGuard('jwt'))
  async TwoFA_QR_Code(@Req() req: Request) {
    const data = this.jwtService.decode(req.cookies['jwtToken']);
    const secret = speakeasy.generateSecret({
      name: 'Transcendence',
    });

    console.log(secret);

    // const data = this.jwtService.decode(req.cookies['jwtToken']);

    // console.log(
    //   'https://www.authenticatorApi.com/pair.aspx?' +
    //     `AppName=${process.env.TWO_FA_42}` +
    //     `&AppInfo=${data['username']}` +
    //     `&SecretCode=${data['userID']}`,
    // );

    // const response = this.request.get(
    //   'https://www.authenticatorApi.com/pair.aspx?' +
    //     `AppName=${process.env.TWO_FA_42}` +
    //     `&AppInfo=${data['username']}` +
    //     `&SecretCode=${data['userID']}`,
    // );

    // console.log(response.subscribe());
  }
}
