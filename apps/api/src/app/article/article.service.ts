import {BadRequestException, Injectable} from "@nestjs/common";
import {SourceRepository} from "../admin/source/source.repository";
import axios from "axios";
import {FeedApi, User} from "@count-of-money/shared";
import {ConfigService} from "../admin/config/config.service";

@Injectable()
export class ArticleService {

  constructor(private configService: ConfigService, private sourceRepository: SourceRepository) {
  }

  public async getAllArticles() {
    const sources = await this.sourceRepository.getAllSources();
    return (await Promise.all(sources.filter((s) => s.enable).map(async (s) => {
      const response = await axios.get<FeedApi>(`https://api.rss2json.com/v1/api.json?rss_url=${s.link}`);
      return response.data.items.map((it) => ({...it, source: s.id})).flat();
    }))).flat();
  }

  public async getRestrictedArticles() {
    const k = await this.configService.getGlobalConfig();
    const sources = await this.sourceRepository.getAllSources();
    const feed = await Promise.all(sources.filter((s) => s.enable).map(async (s) => {
      const response = await axios.get<FeedApi>(`https://api.rss2json.com/v1/api.json?rss_url=${s.link}`);
      return response.data.items.map((it) => ({...it, source: s.id})).flat();
    }));
    return feed.flat().filter((s, index) => index < k.articlesToShow);
  }

  public async getArticle(user: User, sourceId: string, articleId: string) {
    const source = await this.sourceRepository.getSource(sourceId);
    if (!source)
      throw new BadRequestException('Invalid source ID !');
    return (await axios.get<FeedApi>(`https://api.rss2json.com/v1/api.json?rss_url=${source.link}`)).data.items.filter((a) => a.guid === articleId)[0];
  }

}
