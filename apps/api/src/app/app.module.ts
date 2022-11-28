import { Module } from '@nestjs/common';

import {PrismaModule} from "./prisma/prisma.module";
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import {CryptoModule} from "./crypto/crypto.module";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UserModule,
    CryptoModule,
  ],
})
export class AppModule {}
