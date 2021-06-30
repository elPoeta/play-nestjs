import { Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthGurad } from "src/user/guards/auth.guard";
import { ArticleService } from "./article.service";

@Controller('articles')
export class ArticleController {

  constructor(private readonly articleService: ArticleService) { }
  @Post()
  @UseGuards(AuthGurad)
  async createArticle() {
    return await this.articleService.create();
  }
}