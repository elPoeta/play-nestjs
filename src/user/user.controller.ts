import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserDto } from "./dto/registerUser.dto";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Controller()
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post('users')
  async register(@Body('user') registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return await this.userService.register(registerUserDto);
  }
}