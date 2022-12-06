import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UserService} from "../user/user.service";
import {UserRepository} from "../user/user.repository";
import {PrismaService} from "../prisma/prisma.service";
import {EncryptService} from "../credentials/encrypt.service";
import {GoogleModule} from "./google/google.module";
import {PassportModule} from "@nestjs/passport";
import {NativeStrategy} from "./native/native.strategy";
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from "./jwt/jwt.strategy";

@Module({
  imports: [PassportModule, GoogleModule, JwtModule.register({
    secret: process.env.APP_SECRET,
    signOptions: { expiresIn: '7d' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, EncryptService, PrismaService, UserService, UserRepository, NativeStrategy, JwtStrategy],
  exports: [],
})
export class AuthModule {

}
