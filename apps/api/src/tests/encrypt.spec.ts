import {Test, TestingModule} from "@nestjs/testing";
import {EncryptService} from "../app/credentials/encrypt.service";

describe('Auth endpoints', () => {

  let service: EncryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [EncryptService]
    }).compile();

    service = module.get<EncryptService>(EncryptService);
  });

  it("injected classes must be defined",async () => {
    expect(service).toBeDefined();
  })

  describe('Testing encrypt service functions', () => {
    it('Encrypt a password', async () => {
      const newPass = await service.encrypt('HelloWorld');
      expect(newPass).toBeDefined();
    })

    it('Checking password with a good hashed password', async () => {
      const newPass = await service.encrypt('HelloWorld');
      expect(await service.compare('HelloWorld', newPass)).toBe(true);
    })

    it('Checking password with a wrong hashed password', async () => {
      const newPass = await service.encrypt('HelloWorld');
      expect(await service.compare('HelloWorldA', newPass)).toBe(false);
    })
  });
});
