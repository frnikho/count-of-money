import {Injectable, Logger} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import availableCrypto from '../../assets/availablesCrypto.json';
import axios from 'axios';
import {CryptoApi} from "@count-of-money/shared";
import {CryptoRepository} from "./crypto.repository";
import {Cron, CronExpression} from "@nestjs/schedule";
import {OnEvent} from "@nestjs/event-emitter";

@Injectable()
export class CryptoConsumer {

  constructor(private prismaService: PrismaService, private cryptoRepository: CryptoRepository) {
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  @OnEvent('NestJS.Startup', {async: true})
  public async loadAndSaveCrypto() {
    const existingCrypto = await this.prismaService.crypto.findMany();
    for (const crypto of availableCrypto) {
      const c = existingCrypto.find((c) => c.apiId === crypto.id);
      const timer = ms => new Promise(res => setTimeout(res, ms))
      await timer(6000);
      axios.get<CryptoApi>(`https://api.coingecko.com/api/v3/coins/${crypto.id}`).then(async (response) => {
        let crypto;
         if (!c) {
           crypto = await this.cryptoRepository.createCrypto(response.data);
        } else {
           crypto = await this.cryptoRepository.updateCrypto(response.data);
        }
         Logger.debug("Crypto fetched : " + crypto.name);
     }).catch((err) => {
       Logger.error("Can't fetch crypto data : " + crypto.name + `${err.status}`);
      });
    }
  }

/*  public async loadCryptoHistory() {
    axios.get(`https://api.coingecko.com/api/v3/coins/abc/market_chart?vs_currency=eur&days=max`).then((response) => {

    });
  }*/

}
