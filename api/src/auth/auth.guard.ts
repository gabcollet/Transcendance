import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
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
      console.log('THIS IS AN ERROR:\n');
      console.log(err);
      return null;
    }

    Logger.log('*** SUCCESS ***\n' + user);
    console.log(user);

    return user;
  }
}
