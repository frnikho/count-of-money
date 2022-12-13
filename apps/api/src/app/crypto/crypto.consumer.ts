import {Injectable, Logger} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import axios from 'axios';
import {CryptoApi} from "@count-of-money/shared";
import {CryptoRepository} from "./crypto.repository";
import {Cron, CronExpression} from "@nestjs/schedule";
import {OnEvent} from "@nestjs/event-emitter";
import * as path from "path";
import * as fs from "fs";


@Injectable()
export class CryptoConsumer {

  constructor(private prismaService: PrismaService, private cryptoRepository: CryptoRepository) {
  }

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  @OnEvent('NestJS.Startup', {async: true})
  public async loadAndSaveCrypto() {
    const test = Boolean(process.env.TEST);
    const existingCrypto = await this.prismaService.crypto.findMany();
    const availableCrypto = fs.readFileSync(path.join(__dirname, process.env.ENV === 'test' ? '../../assets/cryptoToTest.json' : './assets/availablesCrypto.json'));
    for (const crypto of JSON.parse(availableCrypto.toString())) {
      const c = existingCrypto.find((c) => c.apiId === crypto.id);
      const timer = ms => new Promise(res => setTimeout(res, ms))
      await timer(test ? 1 : 3000);
      axios.get<CryptoApi>(`https://api.coingecko.com/api/v3/coins/${crypto.id}`).then(async (response) => {
         if (!c) {
           await this.cryptoRepository.createCrypto(response.data);
        } else {
           await this.cryptoRepository.updateCrypto(response.data);
        }
         setTimeout(() => {
           this.loadCryptoHistory(crypto.id);
         }, test ? 1 : 3000);
         Logger.debug("Crypto fetched : " + crypto.name);
     }).catch((err) => {
       Logger.error("Can't fetch crypto data : " + crypto.name + `${err.status}`);
      });
    }
  }

  public async loadCryptoHistory(id: string) {
    axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=eur&days=max`).then(async (response) => {
      await this.cryptoRepository.updateCharts(id, response.data);
      Logger.debug("Crypto market charts fetched : " + id);
    }).catch((err) => {
      Logger.error("Can't fetch crypto market charts : " + id);
    });
  }
}
