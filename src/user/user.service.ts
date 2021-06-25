import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegisterUserDto } from "./dto/registerUser.dto";
import { UserEntity } from "./user.entity";
import { sign } from 'jsonwebtoken';
import { UserResponseInterface } from "./types/userResponseInterace.interface";


@Injectable()
export class UserService {

  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    Object.assign(newUser, registerUserDto);
    return await this.userRepository.save(newUser);
  }

  registerResponse(userEntity: UserEntity): UserResponseInterface {
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