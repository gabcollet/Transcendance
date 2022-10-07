import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scrypt as _scrypt,
} from 'crypto';
import { promisify } from 'util';
import { ChatService } from 'src/chat/chat.service';

//* Convert async function that uses callbacks to return a promise instead
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private chatService: ChatService,
  ) {}

  async hashPassword(password: string) {
    //* generates 16 chararactes long salt
    const salt = randomBytes(8).toString('hex');

    //* Hash will be 32 characters long
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    //* combine Hash and salt with a separator in the middle
    const result = salt + '.' + hash.toString('hex');

    return result;
  }

  async validatePassword(id: number, password: string) {
    const room = await this.chatService.getChannel(id);
    if (!room) throw new NotFoundException('Room not found');

    const [salt, storedHash] = room['password'].split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash === hash.toString('hex')) return true;
    else return false;
  }

  async cipherSecret(secret: string) {
    const iv = randomBytes(16);
    const salt = randomBytes(8).toString('hex');

    const password = process.env.CIPHER_SECRET;

    const key = (await scrypt(password, salt, 32)) as Buffer;
    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encryptedSecret = Buffer.concat([
      cipher.update(secret),
      cipher.final(),
    ]);

    return encryptedSecret;
  }

  decipherSecret(secret: Buffer, key: Buffer, iv: Buffer) {
    const decipher = createDecipheriv('aes-256-ctr', key, iv);
    const decryptedSecret = Buffer.concat([
      decipher.update(secret),
      decipher.final(),
    ]);

    return decryptedSecret;
  }

  genVerifiedToken(value: Boolean) {
    const payload = { verified: value };
    const jwtToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
    });

    return jwtToken;
  }

  generateJwtToken(req: Request) {
    const username = req.user['username'];
    const userID = req.user['id'];

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
    const verified = speakeasy.totp.verify({
      secret,
      encoding: 'base32',
      token,
    });

    return verified;
  }
}
