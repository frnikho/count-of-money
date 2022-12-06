import {Module} from "@nestjs/common";
import {CryptoController} from "./crypto.controller";
import {CryptoService} from "./crypto.service";
import {CryptoRepository} from "./crypto.repository";
import {CryptoConsumer} from "./crypto.consumer";
import {PrismaService} from "../prisma/prisma.service";

@Module({
  imports: [],
  controllers: [CryptoController],
  providers: [PrismaService, CryptoService, CryptoRepository, CryptoConsumer],
  exports: [CryptoService, CryptoRepository],
})
export class CryptoModule {

}
