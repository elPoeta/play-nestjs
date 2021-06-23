import { Controller, Get } from "@nestjs/common";
import { TagEntity } from "./tag.entity";
import { TagService } from "./tag.service";

@Controller('tags')
export class TagController {

  constructor(private readonly tagservice: TagService) { }

  @Get()
  findAll(): Promise<TagEntity[]> {
    return this.tagservice.findAll();
  }
}