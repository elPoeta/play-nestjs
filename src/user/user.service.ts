import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegisterUserDto } from "./dto/registerUserDto.dto";
import { UserEntity } from "./user.entity";
import { sign } from 'jsonwebtoken';
import { UserResponseInterface } from "./types/userResponseInterace.interface";
import { LoginUserDto } from "./dto/loginUserDto.dto";
import { UpdateUserDto } from "./dto/udateUserDtoi.dto";


@Injectable()
export class UserService {

  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

  async register(registerUser: RegisterUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      email: registerUser.email,
    });
    const userByUsername = await this.userRepository.findOne({
      username: registerUser.username,
    });
    if (userByEmail || userByUsername) {
      throw new HttpException(
        'Email or username are taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, registerUser);
    return await this.userRepository.save(newUser);
  }

  async login(userLogin: LoginUserDto): Promise<UserEntity> {
    const user: UserEntity = await this.findUserByEmail(userLogin.email);
    if (!user) throw new HttpException('Bad Credentials', HttpStatus.UNPROCESSABLE_ENTITY);
    const isPasswordMatch = await user.comparePassword(userLogin.password);
    if (!isPasswordMatch) throw new HttpException('Bad Credentials', HttpStatus.UNPROCESSABLE_ENTITY);
    return user;
  }

  async update(updateUserDto: UpdateUserDto, user:UserResponseInterface): Promise<UserEntity> {
    delete user.user.token;
    const newUser = new UserEntity();
    Object.assign(newUser, user.user);
    Object.assign(newUser, updateUserDto);
    return await this.userRepository.save(newUser);
  }

  async findUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ email }, { select: ['id', 'username', 'email', 'bio', 'image', 'password'] });
  }

  async findUserById(id: number): Promise<UserEntity | null> {
    return await this.userRepository.findOne({ id });
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