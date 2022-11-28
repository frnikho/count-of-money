import { Module } from '@nestjs/common';

import {PrismaModule} from "./prisma/prisma.module";
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import {CryptoModule} from "./crypto/crypto.module";
import {APP_GUARD} from "@nestjs/core";
import {JwtGuard} from "./auth/jwt/jwt.guard";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    CryptoModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    }
  ]
})
export class AppModule {}
