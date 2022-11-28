import {Test, TestingModule} from "@nestjs/testing";
import {UserService} from "../../app/user/user.service";
import {UserRepository} from "../../app/user/user.repository";
import {PrismaService} from "../../app/prisma/prisma.service";
import {AuthService} from "../../app/auth/auth.service";
import {AuthController} from "../../app/auth/auth.controller";
import {EncryptService} from "../../app/credentials/encrypt.service";
import {JwtModule} from "@nestjs/jwt";
import {mockedUser} from "../mocks/user.mock";

describe('Auth endpoints', () => {

  let service: AuthService;
  let encryptService: EncryptService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule.register({secret: 'HelloWorld'})],
      controllers: [AuthController],
      providers: [AuthService, UserService, UserRepository, PrismaService, EncryptService, ]
    }).compile();

    service = module.get<AuthService>(AuthService);
    encryptService = module.get<EncryptService>(EncryptService);
    prisma = module.get<PrismaService>(PrismaService);
    prisma.user.findMany = jest.fn().mockReturnValueOnce([]);
    prisma.user.findFirst = jest.fn().mockReturnValueOnce(null);
  });

  it("injected classes must be defined",async () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  })

  describe('Auth service functions', () => {

    it('Register a non existing native user', async () => {
      prisma.user.create = jest.fn().mockReturnValueOnce(mockedUser);
      const createdUser = await service.register({firstname: '', lastname: '', email: '', password: ''});
      expect(createdUser).toBeDefined();
    })

    it('Register a existing native user', async () => {
      prisma.user.create = jest.fn().mockReturnValueOnce(mockedUser);
      prisma.user.findFirst = jest.fn().mockReturnValueOnce(mockedUser);
      try {
        await service.register({firstname: '', lastname: '', email: '', password: ''})
        expect(1).toBe(2);
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    })

    it('Validating a existing native user with good password', async () => {
      mockedUser.password = await encryptService.encrypt('HelloWorld');
      prisma.user.findFirst = jest.fn().mockReturnValueOnce(mockedUser);
      const validatedUser = await service.validate({email: 'helloworld@gmail.com', password: 'HelloWorld'})
      expect(validatedUser).toBeDefined();
      expect(validatedUser.email).toBe('helloworld@gmail.com');
    })

    it('Validating a existing native user with bad password', async () => {
      mockedUser.password = await encryptService.encrypt('HelloWorld');
      prisma.user.findFirst = jest.fn().mockReturnValueOnce(mockedUser);
      try {
        await service.validate({email: 'helloworld@gmail.com', password: 'HelloWorldA'})
        expect(2).toBe(1);
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    })

    it('Validating a non existing native user', async () => {
      prisma.user.findFirst = jest.fn().mockReturnValueOnce(null);
      try {
        await service.validate({email: 'helloworld@gmail.com', password: 'HelloWorldA'})
        expect(2).toBe(1);
      } catch (ex) {
        expect(ex).toBeDefined();
      }
    })

    it('Create JWT Payload', () => {
      const payload = service.login(mockedUser);
      expect(payload.user.id).toBe(mockedUser.id);
      expect(payload.accessToken).toBeDefined();
    });
  });
});
