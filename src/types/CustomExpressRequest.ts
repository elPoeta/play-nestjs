import { Request } from "express";
import { UserResponseInterface } from "src/user/types/userResponseInterace.interface";

export interface CustomExpressRequest extends Request {
  user?: UserResponseInterface,
  token?: string
}