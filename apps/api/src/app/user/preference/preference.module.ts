import {Module} from "@nestjs/common";
import {PreferenceController} from "./preference.controller";
import {PreferenceService} from "./preference.service";
import {PreferenceRepository} from "./preference.repository";
import {CryptoService} from "../../crypto/crypto.service";
import {CryptoRepository} from "../../crypto/crypto.repository";
import {PrismaService} from "../../prisma/prisma.service";

@Module({
  imports: [],
  controllers: [PreferenceController],
  providers: [CryptoService, CryptoRepository, PreferenceService, PreferenceRepository, PrismaService],
  exports: [],
})
export class PreferenceModule {

}
