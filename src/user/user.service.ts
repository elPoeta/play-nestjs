import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {

  register(user) {
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