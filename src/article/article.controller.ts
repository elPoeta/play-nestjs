import { Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { User } from "src/user/decorators/user.decorator";
import { AuthGurad } from "src/user/guards/auth.guard";
import { UserResponseInterface } from "src/user/types/userResponseInterace.interface";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/createArticle.dto.";
import { ArticleResponseInterface } from "./types/articleResponse.interface";
import { ArticlesResponseInterface } from "./types/ArticlesResponse.interface";

@Controller('articles')
export class ArticleController {

  constructor(private readonly articleService: ArticleService) { }

  @Get()
  async findAll(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.findAll(currentUserId, query);
  }

  @Get(':slug')
  async getSingleArticle(
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.findBySlug(slug);
    return this.articleService.buildArticleResponse(article);
  }

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


