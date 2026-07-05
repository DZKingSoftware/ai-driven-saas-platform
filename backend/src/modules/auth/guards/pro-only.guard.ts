
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class ProOnlyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.status !== 'pro' && user.status !== 'enterprise') {
      throw new ForbiddenException('This feature requires PRO subscription');
    }

    return true;
  }
}
