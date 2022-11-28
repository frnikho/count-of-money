import {Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {UserRepository} from "./user.repository";
import {PreferenceModule} from "./preference/preference.module";
import {PrismaService} from "../prisma/prisma.service";

@Module({
  imports: [PreferenceModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, PrismaService],
  exports: [UserService, UserRepository],
})
export class UserModule {

}
