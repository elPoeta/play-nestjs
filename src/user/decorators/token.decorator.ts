import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Token = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  if (!request.token) null;
  return request.token;
});