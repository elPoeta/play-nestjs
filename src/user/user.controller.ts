import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { CustomExpressRequest } from "src/types/CustomExpressRequest";
import { Token } from "./decorators/token.decorator";
import { User } from "./decorators/user.decorator";
import { LoginUserDto } from "./dto/loginUserDto.dto";
import { RegisterUserDto } from "./dto/registerUserDto.dto";
import { UpdateUserDto } from "./dto/udateUserDtoi.dto";
import { AuthGurad } from "./guards/auth.guard";
import { UserResponseInterface } from "./types/userResponseInterace.interface";
import { UserEntity } from "./user.entity";
import { UserService } from "./user.service";

@Controller()
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post('users')
  @UsePipes(new ValidationPipe())
  async register(@Body('user') user: RegisterUserDto, @Token() token: string): Promise<UserResponseInterface> {
    const userEntity: UserEntity = await this.userService.register(user);
    return this.userService.buildUserResponse(userEntity, token);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(@Body('user') userLogin: LoginUserDto, @Token() token: string): Promise<UserResponseInterface> {
    const user: UserEntity = await this.userService.login(userLogin);
    return this.userService.buildUserResponse(user, token);
  }


  @Get('user')
  @UseGuards(AuthGurad)
  async currentUser(@User() user: UserResponseInterface): Promise<UserResponseInterface> {
    return user;
  }

  @Put('user')
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGurad)
  async update(@Body('user') updateUserDto: UpdateUserDto, @User() user: UserResponseInterface, @Token() token: string): Promise<UserResponseInterface> {
    const userUpdated = await this.userService.update(updateUserDto, user);
    return this.userService.buildUserResponse(userUpdated, token);
  }
}