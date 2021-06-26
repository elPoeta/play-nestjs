import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "./dto/userDto.dto";
import { UserEntity } from "./user.entity";
import { sign } from 'jsonwebtoken';
import { UserResponseInterface } from "./types/userResponseInterace.interface";
import { LoginUserDto } from "./dto/loginUserDto.dto";


@Injectable()
export class UserService {

  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

  async register(user: UserDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    Object.assign(newUser, user);
    return await this.userRepository.save(newUser);
  }

  async login(userLogin: LoginUserDto): Promise<UserEntity> {
    const user: UserEntity = await this.findUserByEmail(userLogin.email);
    if (!user) throw new HttpException('Bad Credentials', HttpStatus.UNPROCESSABLE_ENTITY);
    const isPasswordMatch = await user.comparePassword(userLogin.password);
    if (!isPasswordMatch) throw new HttpException('Bad Credentials', HttpStatus.UNPROCESSABLE_ENTITY);
    return user;
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ email }, { select: ['id', 'username', 'email', 'bio', 'image', 'password'] });
  }

  buildUserResponse(userEntity: UserEntity): UserResponseInterface {
    delete userEntity.password;
    return {
      user: {
        ...userEntity,
        token: this.generateJWT(userEntity)
      }
    }
  }

  private generateJWT(userEntiy: UserEntity) {
    return sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      id: userEntiy.id,
      email: userEntiy.email,
      username: userEntiy.username
    }, '5up3r53cr3t');
  }
}