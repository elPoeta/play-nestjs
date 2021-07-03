import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/user/user.entity";
import { ArticleController } from "./article.controller";
import { ArticleRepository } from "./article.repository";
import { ArticleService } from "./article.service";

@Module({
  imports: [TypeOrmModule.forFeature([ArticleRepository, UserEntity])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule { }