import { Module } from '@nestjs/common';
import {PrismaModule} from "./prisma/prisma.module";
import {UserModule} from "./user/user.module";
import {AuthModule} from "./auth/auth.module";
import {CryptoModule} from "./crypto/crypto.module";
import {APP_GUARD} from "@nestjs/core";
import {JwtGuard} from "./auth/jwt/jwt.guard";
import {EventEmitterModule} from "@nestjs/event-emitter";
import {ScheduleModule} from "@nestjs/schedule";
import {AdminModule} from "./admin/admin.module";
import {ArticleModule} from "./article/article.module";

@Module({
  imports: [
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    PrismaModule,
    AuthModule,
    UserModule,
    AdminModule,
    ArticleModule,
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
