import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";

@Controller()
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post('users')
  register(@Body('user') user) {
    console.log('BODY ', user)
    return this.userService.register(user);
  }
}