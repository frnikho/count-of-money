
import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {PrismaService} from "../../app/prisma/prisma.service";
import {createMockContext} from "../tools/context";
import {UserService} from "../../app/user/user.service";
import {AuthController} from "../../app/auth/auth.controller";
import {AuthService} from "../../app/auth/auth.service";
import {UserRepository} from "../../app/user/user.repository";
import {EncryptService} from "../../app/credentials/encrypt.service";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "../../app/auth/jwt/jwt.strategy";
import {GoogleService} from "../../app/auth/google/google.service";
import {GoogleStrategy} from "../../app/auth/google/google.strategy";
import {GoogleController} from "../../app/auth/google/google.controller";
import {UserModule} from "../../app/user/user.module";
import {GoogleGuard} from "../../app/auth/google/google.guard";
import {GoogleGuardMock} from "../mocks/google.mock";

describe('Google Auth', () => {
  let app: INestApplication;
  let mockedGoogleApp: INestApplication;
  const ctx = createMockContext();

  beforeAll(async () => {
    const moduleRef = Test.createTestingModule({
      imports: [UserModule, JwtModule.register({secret: 'HelloWorld'})],
      controllers: [AuthController, GoogleController],
      providers: [PrismaService, AuthService, UserService, UserRepository, EncryptService, GoogleService, GoogleStrategy, JwtStrategy]
    })
    await ctx.prisma.$connect();
    app = (await moduleRef.compile()).createNestApplication();
    mockedGoogleApp = (await moduleRef.overrideGuard(GoogleGuard).useClass(GoogleGuardMock).compile()).createNestApplication();
    await app.init();
    await mockedGoogleApp.init();
  });

  describe(`GET /auth/google`, () => {
    it('Redirect to google login', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/google')
        .send();
      expect(response.status).toBe(302);
    })
  });

  describe(`POST /auth/google`, () => {
    it('Redirect to google login', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/google')
        .send();
      expect(response.status).toBe(302);
    })
  });

  describe('GET /auth/google/redirect', () => {
    it('Redirect google login with no data should redirect to google login', async () => {
      await request(app.getHttpServer())
        .get('/auth/google/redirect')
        .send();
    })

    it('Redirect google login with wrong data should respond 400', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/google/redirect?code=good&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=none')
        .send();
      expect(response.body.statusCode).toBe(400);
      expect(response.body.message).toBe('A google error occurred !');
    })
  });

  afterAll(async () => {
    await app.close();
  });
});


describe('Google Auth - Mocked google oauth', () => {
  let app: INestApplication;
  const ctx = createMockContext();

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [UserModule, JwtModule.register({secret: 'HelloWorld'})],
      controllers: [AuthController, GoogleController],
      providers: [AuthService, UserService, UserRepository, PrismaService, EncryptService, GoogleService, GoogleStrategy, JwtStrategy]
    }).overrideGuard(GoogleGuard).useClass(GoogleGuardMock).compile()
    await ctx.prisma.$connect();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('Redirect google login with good data should respond 201 with new user', async () => {
    const response = await request(app.getHttpServer())
      .get('/auth/google/redirect?code=bad&scope=email+profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=none')
      .send();
    expect(response.status).toBe(200);
  })

  afterAll(async () => {
    await app.close();
  });

})
