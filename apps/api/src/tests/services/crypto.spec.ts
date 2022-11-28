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
describe('Auth endpoints', () => {

  let service: CryptoService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({secret: 'HelloWorld'})],
      controllers: [CryptoController],
      providers: [CryptoService, CryptoRepository, UserRepository, PrismaService]
    }).compile();

    service = module.get<CryptoService>(CryptoService);
    prisma = module.get<PrismaService>(PrismaService);
    prisma.crypto.findMany = jest.fn().mockReturnValueOnce([]);
    prisma.crypto.findFirst = jest.fn().mockReturnValueOnce(null);
    prisma.crypto.create = jest.fn().mockReturnValueOnce(undefined);
  });

  it("injected classes must be defined",async () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  })


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

  })

});
