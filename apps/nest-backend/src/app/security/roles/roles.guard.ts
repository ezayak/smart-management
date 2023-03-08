import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user = context.getArgs()[0].user;
    const url = context.getArgs()[0].url;
    const method = context.getArgs()[0].method;

    if (!user) {
      return false;
    }

    console.log('lena-dev context RolesGuard', user);
    console.log('lena-dev context RolesGuard', url);
    console.log('lena-dev context RolesGuard', method);
    //implementing logic of checking role access

    if (user.role.name.toLowerCase() === 'admin') {
      return true;
    } else {
      return false;
    }
  }
}
