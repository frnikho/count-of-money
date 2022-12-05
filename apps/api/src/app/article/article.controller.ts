import {Controller, Get, Param, Request} from "@nestjs/common";
import { Public } from "../auth/jwt/jwt.decorator";
import {ArticleService} from "./article.service";

@Controller('article')
export class ArticleController {

  constructor(private articleService: ArticleService) {
  }

  @Public()
  @Get('public')
  public getRestrictedArticles() {
    return this.articleService.getRestrictedArticles();
  }

  @Get()
  public getAllArticles() {
    return this.articleService.getAllArticles();
  }

  @Public()
  @Get(':sourceId/:articleId')
  public getArticle(@Request() req, @Param('sourceId') sourceId: string, @Param('articleId') articleId: string) {
    return this.articleService.getArticle(req.user, sourceId, articleId);
  }
}
