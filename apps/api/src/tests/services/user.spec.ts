import {Test, TestingModule} from "@nestjs/testing";
import {UserController} from "../../app/user/user.controller";
import {UserService} from "../../app/user/user.service";
import {UserRepository} from "../../app/user/user.repository";
import {PrismaService} from "../../app/prisma/prisma.service";
import {mockedGoogleUser} from "../mocks/user.mock";


describe('User endpoints', () => {

  let service: UserService;
  let repository: UserRepository;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, UserRepository, PrismaService]
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<UserRepository>(UserRepository);
    prisma = module.get<PrismaService>(PrismaService);
    prisma.user.findMany = jest.fn().mockReturnValueOnce([]);
    prisma.user.findFirst = jest.fn().mockReturnValueOnce(null);
  });

  it("injected classes must be defined",async () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(prisma).toBeDefined();
  })

  describe('Register native user', () => {

    it('Login google account', async () => {
      prisma.user.findFirst = jest.fn().mockReturnValueOnce(mockedGoogleUser);
      const user = await service.loginGoogleAccount({user: {email: 'helloworldgoogle@gmail.com', firstName: 'Hello', lastName: 'World', picture: 'abc'}})
      expect(user).toBeDefined();
      expect(user.email).toBe('helloworldgoogle@gmail.com')
    });

    it('Register google account', async () => {
      prisma.user.create = jest.fn().mockReturnValueOnce(mockedGoogleUser);
      const user = await service.loginGoogleAccount({user: {email: 'helloworldgoogle@gmail.com', firstName: 'Hello', lastName: 'World', picture: 'abc'}})
      expect(user).toBeDefined();
      expect(user.email).toBe('helloworldgoogle@gmail.com')
    });
  });

});
