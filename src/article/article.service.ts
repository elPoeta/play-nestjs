import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "src/user/user.entity";
import { UserRepository } from "src/user/user.repository";
import { ArticleEntity } from "./article.entity";
import { ArticleRepository } from "./article.repository";
import { CreateArticleDto } from "./dto/createArticle.dto.";
import slugify from 'slugify';
import { ArticleResponseInterface } from "./types/articleResponse.interface";
import { UserResponseInterface } from "src/user/types/userResponseInterace.interface";

@Injectable()
export class ArticleService {

  constructor(@InjectRepository(ArticleRepository) private articleRepository: ArticleRepository,
  @InjectRepository(UserRepository) private userRepository: UserRepository){}
  
  async create(
    currentUser: UserResponseInterface,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    Object.assign(article, createArticleDto);
    if (!article.tagList) {
      article.tagList = [];
    }

    article.slug = this.getSlug(createArticleDto.title);
    delete currentUser.user.token;
    const user = new UserEntity()
    Object.assign(user, currentUser.user);
    article.author = user;

    return await this.articleRepository.save(article);
  }

  buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
    return { article };
  }

  private getSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
}