import {Test, TestingModule} from "@nestjs/testing";
import {PrismaService} from "../../app/prisma/prisma.service";
import {SourceService} from "../../app/admin/source/source.service";
import {SourceController} from "../../app/admin/source/source.controller";
import {SourceRepository} from "../../app/admin/source/source.repository";
import {mockedUser} from "../mocks/user.mock";
import {mockedSource} from "../mocks/source.mock";
describe('Admin Source endpoints', () => {

  let service: SourceService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [SourceController],
      providers: [SourceService, SourceRepository, PrismaService]
    }).compile();

    service = module.get<SourceService>(SourceService);
    prisma = module.get<PrismaService>(PrismaService);
    prisma.source.findMany = jest.fn().mockReturnValueOnce([]);
    prisma.source.findFirst = jest.fn().mockReturnValueOnce(null);
    prisma.source.create = jest.fn().mockReturnValueOnce(undefined);
    prisma.source.delete = jest.fn().mockReturnValueOnce(undefined);
    prisma.source.deleteMany = jest.fn().mockReturnValueOnce(undefined);
    prisma.source.update = jest.fn().mockReturnValueOnce(undefined);
  });

  it("injected classes must be defined",async () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  })

  describe('Getting all sources ',() => {
    it('Getting all sources (user) should throw forbidden exception', async () => {
      mockedUser.role = 'User';
      try {
        service.getAllSources(mockedUser);
        expect(1).toBe(2);
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    });

    it('Getting all sources (admin) should pass', async () => {
      mockedUser.role = 'Admin';
      prisma.source.findMany = jest.fn().mockReturnValueOnce([mockedSource, mockedSource]);
      const sources = await service.getAllSources(mockedUser);
      expect(sources.length).toBe(2);
    });
  });

  describe('Getting a specific source ',() => {
    it('Getting a specific sources (user) should throw forbidden exception', async () => {
      mockedUser.role = 'User';
      try {
        service.getSource(mockedUser, mockedSource);
        expect(1).toBe(2);
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    });

    it('Getting all sources (admin) should pass', async () => {
      mockedUser.role = 'Admin';
      prisma.source.findFirst = jest.fn().mockReturnValueOnce(mockedSource);
      const sources = await service.getSource(mockedUser, mockedSource);
      expect(sources.id).toBe(mockedSource.id);
    });
  });


  describe('Deleting a specific source',  () => {
    it('Deleting a specific source (user) should throw forbidden exception', async () => {
      mockedUser.role = 'User';
      try {
        service.deleteSource(mockedUser, mockedSource);
        expect(1).toBe(2);
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    });

    it('Deleting a specific source (admin) should pass', async () => {
      mockedUser.role = 'Admin';
      prisma.source.findFirst = jest.fn().mockReturnValueOnce(undefined);
      prisma.source.delete = jest.fn().mockReturnValueOnce(undefined);
      const sources = await service.deleteSource(mockedUser, mockedSource);
      expect(sources).toBe(undefined);
    });
  });

  describe('Deleting all source',  () => {
    it('Deleting all source (user) should throw forbidden exception', async () => {
      mockedUser.role = 'User';
      try {
        service.deleteSource(mockedUser, mockedSource);
        expect(1).toBe(2);
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    });

    it('Deleting all source (admin) should pass', async () => {
      mockedUser.role = 'Admin';
      prisma.source.deleteMany = jest.fn().mockReturnValueOnce([]);
      const sources = await service.deleteAllSource(mockedUser);
      expect(sources).toStrictEqual([]);
    });
  });

  describe('Updating a specific source',  () => {
    it('Updating a specific source (user) should throw forbidden exception', async () => {
      mockedUser.role = 'User';
      try {
        service.updateSource(mockedUser, mockedSource, {});
        expect(1).toBe(2);
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    });

    it('Updating a specific source (admin) should pass', async () => {
      mockedUser.role = 'Admin';
      prisma.source.update = jest.fn().mockReturnValueOnce({name: 'testabc'});
      const source = await service.updateSource(mockedUser, mockedSource, {name: 'testabc'});
      expect(source.name).toBe('testabc');
    });
  });

  describe('Creating a source',  () => {
    it('Creating a source (user) should throw forbidden exception', async () => {
      mockedUser.role = 'User';
      try {
        service.createSource(mockedUser, {enable: false, link: '', name: ''});
        expect(1).toBe(2);
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    });

    it('Creating source (admin) should pass', async () => {
      mockedUser.role = 'Admin';
      prisma.source.create = jest.fn().mockReturnValueOnce(mockedSource);
      const source = await service.createSource(mockedUser, mockedSource);
      expect(source.name).toBe(mockedSource.name);
      expect(source.link).toBe(mockedSource.link);
    });
  });

});
