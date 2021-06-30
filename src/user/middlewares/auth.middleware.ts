import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken'
import { UserService } from '../user.service';
import { CustomExpressRequest } from 'src/types/CustomExpressRequest';


@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private readonly userService: UserService) { }

  async use(req: CustomExpressRequest, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      req.user = null;
      next();
      return;
    }
    if (!authorization.startsWith('Bearer ')) {
      req.user = null;
      next();
      return;
    }
    const token = authorization.split(' ')[1];
    try {
      const decode = verify(token, '5up3r53cr3t');
      const user = await this.userService.findUserById(decode.id);
      req.user = user;
      req.token = token;
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
