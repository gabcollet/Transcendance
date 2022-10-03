import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import { log } from 'console';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  generateJwtToken(req: Request) {
    const username = req.user['username'];
    const userID = req.user['id'];
    // console.log('userID: ' + userID);

    const payload = { username: username, userID: userID };
    const jwtToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });

    return jwtToken;
  }

  async toggleTwoFA(token: string) {
    const jwtToken = this.jwtService.decode(token);
    let user = await this.userService.findById(jwtToken['userID']);

    if (user['twoFAEnabled'] === false)
      user = await this.userService.updateUser(
        { twoFAEnabled: true },
        jwtToken['username'],
      );
    else
      user = await this.userService.updateUser(
        { twoFAEnabled: false },
        jwtToken['username'],
      );
    return user;
  }

  async genTwoFASecret(username: string) {
    //* Generate a secret for the 2FA authenticator

    const name = `Transcendence (${username})`;
    const secret = speakeasy.generateSecret({
      name: name,
    });

    //* update user with generated 2FA Secret for validation
    await this.userService.updateUser({ twoFASecret: secret.base32 }, username);

    return secret;
  }

  async genQRCode(otpt_url: string) {
    const img = await qrcode.toDataURL(otpt_url);
    return img;
  }

  async twoFAVerify(tokenString: string, token: string) {
    const jwtToken = this.jwtService.decode(tokenString);
    const user = await this.userService.findById(jwtToken['userID']);

    const secret = user['twoFASecret'];
    // console.log('SECRET: ' + secret);
    const verified = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
    });

    return verified;
  }
}
