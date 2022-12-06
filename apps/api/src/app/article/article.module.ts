import { Module } from "@nestjs/common";
import {ArticleController} from "./article.controller";
import {ArticleService} from "./article.service";
import {PrismaService} from "../prisma/prisma.service";
import {SourceRepository} from "../admin/source/source.repository";
import {ConfigService} from "../admin/config/config.service";
import {ConfigRepository} from "../admin/config/config.repository";

@Module({
  imports: [],
  controllers: [ArticleController],
  providers: [ConfigService, ConfigRepository, ArticleService, SourceRepository, PrismaService],
  exports: []
})
export class ArticleModule {

}
