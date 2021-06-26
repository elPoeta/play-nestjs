import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { LoginUserDto } from "./dto/loginUserDto.dto";
import { UserDto } from "./dto/userDto.dto";
import { UserResponseInterface } from "./types/userResponseInterace.interface";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Controller()
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post('users')
  @UsePipes(new ValidationPipe())
  async register(@Body('user') user: UserDto): Promise<UserResponseInterface> {
    const userEntity: UserEntity = await this.userService.register(user);
    return this.userService.buildUserResponse(userEntity);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(@Body('user') userLogin: LoginUserDto): Promise<UserResponseInterface> {
    const user: UserEntity = await this.userService.login(userLogin);
    return this.userService.buildUserResponse(user);
  }
}