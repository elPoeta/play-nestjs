import { Body, Controller, Post } from "@nestjs/common";
import { UserDto } from "./dto/userDto.dto";
import { UserResponseInterface } from "./types/userResponseInterace.interface";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Controller()
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post('users')
  async register(@Body('user') user: UserDto): Promise<UserResponseInterface> {
    const userEntity: UserEntity = await this.userService.register(user);
    return this.userService.buildUserResponse(userEntity);
  }

  @Post('users/login')
  async login(@Body('user') userLogin: UserDto): Promise<UserResponseInterface> {
    const user: UserEntity = await this.userService.login(userLogin);
    return this.userService.buildUserResponse(user);
  }
}