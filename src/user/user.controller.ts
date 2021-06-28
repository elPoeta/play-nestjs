import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UsePipes, ValidationPipe } from "@nestjs/common";
import { CustomExpressRequest } from "src/types/CustomExpressRequest";
import { LoginUserDto } from "./dto/loginUserDto.dto";
import { RegisterUserDto } from "./dto/registerUserDto.dto";
import { UserResponseInterface } from "./types/userResponseInterace.interface";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Controller()
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post('users')
  @UsePipes(new ValidationPipe())
  async register(@Body('user') user: RegisterUserDto): Promise<UserResponseInterface> {
    const userEntity: UserEntity = await this.userService.register(user);
    return this.userService.buildUserResponse(userEntity);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(@Body('user') userLogin: LoginUserDto): Promise<UserResponseInterface> {
    const user: UserEntity = await this.userService.login(userLogin);
    return this.userService.buildUserResponse(user);
  }


  @Get('user')
  async currentUser(@Req() req: CustomExpressRequest): Promise<UserResponseInterface> {
    if (!req.user) throw new HttpException('Bad Credentials', HttpStatus.UNAUTHORIZED)
    return req.user;
  }

}