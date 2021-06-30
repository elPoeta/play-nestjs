import { Request } from "express";
import { UserEntity } from "src/user/user.entity";

export interface CustomExpressRequest extends Request {
  user?: UserEntity,
  token?: string
}