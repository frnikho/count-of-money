import {Controller, Get, Param, Request} from "@nestjs/common";
import { Public } from "../auth/jwt/jwt.decorator";
import {ArticleService} from "./article.service";
import {ApiBearerAuth, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiServiceUnavailableResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import { Feed } from "@count-of-money/shared";
import {ResponseError} from "@count-of-money/documentation";

@Controller('article')
@ApiTags('Article')
export class ArticleController {

  constructor(private articleService: ArticleService) {
  }

  @Public()
  @Get('public')
  @ApiOkResponse({type: Feed, isArray: true})
  @ApiForbiddenResponse({description: `Forbidden, you don't have right to do that`, type: ResponseError})
  @ApiUnauthorizedResponse({description: 'Unauthorized, you need to be logged !', type: ResponseError})
  @ApiServiceUnavailableResponse({description: 'Service unavailable', type: ResponseError})
  @ApiInternalServerErrorResponse({description: 'An internal error occurred, please try again later !', type: ResponseError})
  public getRestrictedArticles() {
    return this.articleService.getRestrictedArticles();
  }

  @Get()
  @ApiOkResponse({type: Feed, isArray: true})
  @ApiForbiddenResponse({description: `Forbidden, you don't have right to do that`, type: ResponseError})
  @ApiUnauthorizedResponse({description: 'Unauthorized, you need to be logged !', type: ResponseError})
  @ApiServiceUnavailableResponse({description: 'Service unavailable', type: ResponseError})
  @ApiInternalServerErrorResponse({description: 'An internal error occurred, please try again later !', type: ResponseError})
  @ApiBearerAuth()
  public getAllArticles() {
    return this.articleService.getAllArticles();
  }

  @Public()
  @Get(':sourceId/:articleId')
  @ApiOkResponse({type: Feed})
  @ApiForbiddenResponse({description: `Forbidden, you don't have right to do that`, type: ResponseError})
  @ApiUnauthorizedResponse({description: 'Unauthorized, you need to be logged !', type: ResponseError})
  @ApiServiceUnavailableResponse({description: 'Service unavailable', type: ResponseError})
  @ApiInternalServerErrorResponse({description: 'An internal error occurred, please try again later !', type: ResponseError})
  @ApiBearerAuth()
  public getArticle(@Request() req, @Param('sourceId') sourceId: string, @Param('articleId') articleId: string) {
    return this.articleService.getArticle(req.user, sourceId, articleId);
  }
}
