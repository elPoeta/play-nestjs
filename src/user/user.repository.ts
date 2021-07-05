import { HttpException, HttpStatus } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { RegisterUserDto } from "./dto/registerUserDto.dto";
import { UserEntity } from "./user.entity";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

  async createUser(registerUser: RegisterUserDto) {
    const userByEmail = await this.findOne({
      email: registerUser.email,
    });
    const userByUsername = await this.findOne({
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
    return await this.save(newUser);
  }
}