import { Injectable } from "@nestjs/common";

@Injectable()
export class TagService {

  findAll(): String[] {
    return ['node', 'javascript', 'nestjs', 'postgres'];
  }
}