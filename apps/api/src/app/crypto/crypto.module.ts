import {Module} from "@nestjs/common";
import {CryptoController} from "./crypto.controller";
import {CryptoService} from "./crypto.service";
import {CryptoRepository} from "./crypto.repository";

@Module({
  imports: [],
  controllers: [CryptoController],
  providers: [CryptoService, CryptoRepository],
  exports: [CryptoService, CryptoRepository],
})
export class CryptoModule {

}
