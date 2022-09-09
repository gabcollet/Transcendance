import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthorizationGuard extends AuthGuard('42') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser | null {
    if (err || !user) {
      return null;
    }
    console.log(user);
    return user;
  }
}
