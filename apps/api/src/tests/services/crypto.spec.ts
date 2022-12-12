import {Test, TestingModule} from "@nestjs/testing";
import {UserRepository} from "../../app/user/user.repository";
import {PrismaService} from "../../app/prisma/prisma.service";
import {JwtModule} from "@nestjs/jwt";
import {CryptoService} from "../../app/crypto/crypto.service";
import {CryptoController} from "../../app/crypto/crypto.controller";
import {CryptoRepository} from "../../app/crypto/crypto.repository";
import {mockedUser} from "../mocks/user.mock";
import {mockedCrypto} from "../mocks/crypto.mock";
import {Role} from '.prisma/client';
import {CryptoConsumer} from "../../app/crypto/crypto.consumer";
describe('Auth endpoints', () => {

  let service: CryptoService;
  let consumer: CryptoConsumer;
  let prisma: PrismaService;

  beforeEach(async () => {
    process.env = { ...process.env, TEST: 'true' }
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({secret: 'HelloWorld'})],
      controllers: [CryptoController],
      providers: [CryptoService, CryptoRepository, CryptoConsumer, UserRepository, PrismaService]
    }).compile();

    service = module.get<CryptoService>(CryptoService);
    prisma = module.get<PrismaService>(PrismaService);
    consumer = module.get<CryptoConsumer>(CryptoConsumer);
    prisma.crypto.findMany = jest.fn().mockReturnValueOnce([]);
    prisma.crypto.findFirst = jest.fn().mockReturnValueOnce(null);
    prisma.crypto.create = jest.fn().mockReturnValueOnce(undefined);
  });

  it("injected classes must be defined",async () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  })

  it('Crypto consumer', async () => {
    jest.setTimeout(10000);
    await consumer.loadAndSaveCrypto()
  });


  describe('Crypto services functions', () => {
    it('get all crypto (admin)', async () => {
      prisma.crypto.findMany = jest.fn().mockReturnValueOnce([mockedCrypto({enable: false})]);
      mockedUser.role = Role.Admin;
      const crypto = await service.getAllCrypto(mockedUser);
      expect(crypto.length).toBe(1);
    })

    it ('get all crypto (user)',  async() => {
      prisma.crypto.findMany = jest.fn().mockReturnValueOnce([]);
      mockedUser.role = Role.User;
      const crypto = await service.getAllCrypto(mockedUser);
      expect(crypto.length).toBe(0);
    })

    it('Toggle crypto', async () => {
      prisma.crypto.update = jest.fn().mockReturnValueOnce(mockedCrypto({enable: true}));
      mockedUser.role = Role.User;
      const crypto = await service.toggleCrypto(mockedUser, mockedCrypto(), true);
      expect(crypto.enable).toBe(true);
    });


    it('Get crypto', async () => {
      const crypto = await service.getCrypto(mockedUser, mockedCrypto());
      expect(crypto).toBeDefined();
    })

    it('Update crypto', async () => {
      mockedUser.role = 'User';
      prisma.crypto.update = jest.fn().mockReturnValueOnce(mockedCrypto());
      await service.updateCrypto(mockedUser, {disableCrypto: ['bitcoin'], enableCrypto: ['ethereum']});
      expect(1).toBe(1);
    });

  })

});
