import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ArticleRepository } from "./article.repository";

@Injectable()
export class ArticleService {

  constructor(@InjectRepository(ArticleRepository) private articleRepository: ArticleRepository){}
  
  async create() {
    return 'Create article From service'
  }
}