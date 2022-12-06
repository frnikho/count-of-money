import {Test, TestingModule} from "@nestjs/testing";
import {PrismaService} from "../../app/prisma/prisma.service";
import {SourceService} from "../../app/admin/source/source.service";
import {SourceRepository} from "../../app/admin/source/source.repository";
import {ArticleService} from "../../app/article/article.service";
import {ConfigService} from "../../app/admin/config/config.service";
import {ConfigRepository} from "../../app/admin/config/config.repository";
import {mockedConfig} from "../mocks/config.mock";
import {mockedSource} from "../mocks/source.mock";
import {mockedUser} from "../mocks/user.mock";
describe('Admin Source endpoints', () => {

  let service: ArticleService;
  let config: ConfigService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [ArticleService, ConfigService, ConfigRepository, SourceService, SourceRepository, PrismaService]
    }).compile();

    service = module.get<ArticleService>(ArticleService);
    prisma = module.get<PrismaService>(PrismaService);
    config = module.get<ConfigService>(ConfigService);
    prisma.config.findMany = jest.fn().mockReturnValueOnce([]);
    prisma.config.findFirst = jest.fn().mockReturnValueOnce(null);
    prisma.config.create = jest.fn().mockReturnValueOnce(undefined);
    prisma.config.delete = jest.fn().mockReturnValueOnce(undefined);
    prisma.config.deleteMany = jest.fn().mockReturnValueOnce(undefined);
    prisma.config.update = jest.fn().mockReturnValueOnce(undefined);
  });

  it("injected classes must be defined",async () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });


  describe('Getting articles from sources', () => {
    it('Getting restricted articles (public)', async () => {
      prisma.config.findFirst = jest.fn().mockReturnValueOnce(mockedConfig);
      prisma.source.findMany = jest.fn().mockReturnValueOnce([mockedSource, mockedSource]);
      const articles = await service.getRestrictedArticles();
      expect(articles).toBeDefined();
      expect(articles.length).toBe(5);
    });

    it('Getting all articles (public)', async () => {
      prisma.config.findFirst = jest.fn().mockReturnValueOnce(mockedConfig);
      prisma.source.findMany = jest.fn().mockReturnValueOnce([mockedSource, mockedSource]);
      const articles = await service.getAllArticles();
      expect(articles).toBeDefined();
      expect(articles.length).toBeGreaterThan(5);
    })

    it('Getting all articles (public)', async () => {
      prisma.config.update = jest.fn().mockReturnValueOnce({articlesToShow: 2, cryptoToShow: 20});
      mockedUser.role = 'Admin';
      config.updateGlobalConfig(mockedUser, {articlesToShow: 2, cryptoToShow: 20});
      prisma.config.findFirst = jest.fn().mockReturnValueOnce(mockedConfig);
      prisma.source.findMany = jest.fn().mockReturnValueOnce([mockedSource, mockedSource]);
      const articles = await service.getRestrictedArticles();
      expect(articles).toBeDefined();
      expect(articles.length).toBeGreaterThan(2);
    })
  });

});
