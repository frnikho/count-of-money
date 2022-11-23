
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {PrismaService} from "../../app/prisma/prisma.service";
import {createMockContext} from "../tools/context";
import {UserService} from "../../app/user/user.service";
import {PrismaClient} from ".prisma/client";
import {mockedUser} from "../mocks/user.mock";
import {AuthController} from "../../app/auth/auth.controller";
import {AuthService} from "../../app/auth/auth.service";
import {UserRepository} from "../../app/user/user.repository";
import {EncryptService} from "../../app/credentials/encrypt.service";
import {JwtModule} from "@nestjs/jwt";
import {NativeStrategy} from "../../app/auth/native/native.strategy";
import {JwtStrategy} from "../../app/auth/jwt/jwt.strategy";

describe('Auth', () => {
  let app: INestApplication;
  let encryptService: EncryptService;
  let prisma: PrismaClient;
  const ctx = createMockContext();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule.register({secret: 'HelloWorld'})],
      controllers: [AuthController],
      providers: [AuthService, UserService, UserRepository, PrismaService, EncryptService, NativeStrategy, JwtStrategy]
    })
      .compile();
    await ctx.prisma.$connect();
    app = moduleRef.createNestApplication();
    encryptService = app.get<EncryptService>(EncryptService);
    prisma = app.get(PrismaService);
    await app.init();
  });

  describe(`POST /auth/login`, () => {

    it('Logging a non existing user', async () => {
      prisma.user.findFirst = jest.fn().mockReturnValueOnce(null);
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          "email": "helloworlda@gmail.com",
          "password": "helloworld"
        });
      expect(response.status).toBe(400);
    })

    it('Logging an existing user', async () => {
      mockedUser.password = await encryptService.encrypt('HelloWorld')
      prisma.user.findFirst = jest.fn().mockReturnValueOnce(mockedUser);
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send({
          "email": "helloworld@gmail.com",
          "password": "HelloWorld"
        });
      expect(response.status).toBe(200);
      expect(response.body.user.email).toBe('helloworld@gmail.com')
    })
  });

  describe('POST /auth/register',  () => {

    it('Register new user',  async () => {
      prisma.user.findFirst = jest.fn().mockReturnValueOnce(null);
      prisma.user.create = jest.fn().mockReturnValueOnce(mockedUser);
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          "email": "helloworld@gmail.com",
          "password": "helloworld",
          "firstname": "Hello",
          "lastname": "World"
        });
      expect(response.status).toBe(201);
      expect(response.body.email).toBe('helloworld@gmail.com');
    })

    it('Register an existing user',  async () => {
      prisma.user.findFirst = jest.fn().mockReturnValueOnce(mockedUser);
      prisma.user.create = jest.fn().mockReturnValueOnce(mockedUser);
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send({
          "email": "helloworld@gmail.com",
          "password": "helloworld",
          "firstname": "Hello",
          "lastname": "World"
        });
      expect(response.status).toBe(400);
    })
  })

  afterAll(async () => {
    await app.close();
  });
});
