import { Controller, Get } from "@nestjs/common";
import { TagService } from "./tag.service";

@Controller('tags')
export class TagController {

  constructor(private readonly tagservice: TagService) { }

  @Get()
  findAll(): String[] {
    return this.tagservice.findAll();
  }
}