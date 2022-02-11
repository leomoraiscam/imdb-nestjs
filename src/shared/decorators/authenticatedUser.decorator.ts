import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthenticatedUser = createParamDecorator(
  (field: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.user[field] || request.user;
  },
);
