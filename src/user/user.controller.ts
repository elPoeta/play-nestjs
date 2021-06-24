import { Body, Controller, Post } from "@nestjs/common";
import { RegisterUserDto } from "./dto/registerUser.dto";
import { RegisterResponseInterface } from "./types/RegisterResponseInterace.interface";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Controller()
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post('users')
  async register(@Body('user') registerUserDto: RegisterUserDto): Promise<RegisterResponseInterface> {
    const userEntity = await this.userService.register(registerUserDto);
    return this.userService.registerResponse(userEntity);
  }
}