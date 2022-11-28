import {Module} from "@nestjs/common";
import {GoogleService} from "./google.service";
import {GoogleStrategy} from "./google.strategy";
import {GoogleController} from "./google.controller";
import {UserModule} from "../../user/user.module";
import {AuthService} from "../auth.service";
import {EncryptService} from "../../credentials/encrypt.service";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [UserModule, JwtModule.register({secret: process.env.APP_SECRET})],
  exports: [GoogleService, GoogleStrategy],
  providers: [GoogleService, GoogleStrategy, AuthService, EncryptService],
  controllers: [GoogleController]
})
export class GoogleModule {

}
