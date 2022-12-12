import {Article} from "@count-of-money/shared";
import api, {authorize} from "../utils/api";

export type ArticleCallback = (article?: Article, error?: string) => void;
export type ArticlesCallback = (articles: Article[], error?: string) => void;

export class ArticleApiController {

  public static loadPublicArticles(callback: ArticlesCallback) {
    api.get<Article[]>(`article/public`).then((response) => {
      return callback(response.data)
    }).catch(() => {
      return callback([], "Une erreur est survenue !");
    });
  }

  public static loadArticles(accessToken: string, callback: ArticlesCallback) {
    api.get<Article[]>(`article`, authorize(accessToken)).then((response) => {
      return callback(response.data)
    }).catch(() => {
      return callback([], "Une erreur est survenue !");
    });
  }

  public static loadArticle(sourceId: string, articleId: string, callback: ArticleCallback) {
    api.get<Article>(`article/${sourceId}/${articleId}`).then((response) => {
      return callback(response.data)
    }).catch(() => {
      return callback(undefined, "Une erreur est survenue !");
    });
  }

}
