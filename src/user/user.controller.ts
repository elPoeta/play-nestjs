import { Controller, Post } from "@nestjs/common";

@Controller()
export class UserController {

  @Post('users')
  register() {
    return 'register'
  }
}