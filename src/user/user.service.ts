import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegisterUserDto } from "./dto/registerUser.dto";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserService {

  constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>) { }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    Object.assign(newUser, registerUserDto);
    return await this.userRepository.save(newUser);
  }
}