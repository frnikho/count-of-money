import {Injectable, Logger} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import availableCrypto from '../../assets/availablesCrypto.json';
import axios from 'axios';
import {CryptoApi} from "@count-of-money/shared";
import {CryptoRepository} from "./crypto.repository";
import {Cron, CronExpression} from "@nestjs/schedule";

@Injectable()
export class CryptoConsumer {

  constructor(private prismaService: PrismaService, private cryptoRepository: CryptoRepository) {
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  /*@OnEvent('NestJS.Startup', {async: true})*/
  public async loadAndSaveCrypto() {
    const existingCrypto = await this.prismaService.crypto.findMany();
    for (const crypto of availableCrypto) {
      const c = existingCrypto.find((c) => c.apiId === crypto.id);
      const timer = ms => new Promise(res => setTimeout(res, ms))
      await timer(3000);
      axios.get<CryptoApi>(`https://api.coingecko.com/api/v3/coins/${crypto.id}`).then(async (response) => {
         if (!c) {
           await this.cryptoRepository.createCrypto(response.data);
        } else {
           await this.cryptoRepository.updateCrypto(response.data);
        }
     }).catch(() => {
       Logger.error("Can't fetch crypto data !");
      });
    }
  }
}
