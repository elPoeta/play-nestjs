import { Injectable } from "@nestjs/common";
import { RegisterUserDto } from "./dto/registerUser.dto";

@Injectable()
export class UserService {

  register(registerUserDto: RegisterUserDto) {
    return {
      user: {
        email: "leonardo.a.tosetto@gamil.com",
        username: "elPoeta",
        bio: "I work at browxy",
        image: '',
      }
    };
  }
}