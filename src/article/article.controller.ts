import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { User } from "src/user/decorators/user.decorator";
import { AuthGurad } from "src/user/guards/auth.guard";
import { UserResponseInterface } from "src/user/types/userResponseInterace.interface";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/createArticle.dto.";
import { ArticleResponseInterface } from "./types/articleResponse.interface";

@Controller('articles')
export class ArticleController {

  constructor(private readonly articleService: ArticleService) { }
  @Post()
  @UseGuards(AuthGurad)
  @UsePipes(new ValidationPipe())
  async createArticle(
    @User() currentUser: UserResponseInterface,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.create(
      currentUser,
      createArticleDto,
    );
    return this.articleService.buildArticleResponse(article);
  }
}


