import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserDto } from "./dto/registerUser.dto";
import { UserService } from "./user.service";

@Controller()
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post('users')
  register(@Body('user') registerUserDto: RegisterUserDto) {
    console.log('BODY ', registerUserDto)
    return this.userService.register(registerUserDto);
  }
}