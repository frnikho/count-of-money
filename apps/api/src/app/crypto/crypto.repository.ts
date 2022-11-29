import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {CryptoApi, User} from "@count-of-money/shared";
import {Crypto} from '.prisma/client';

@Injectable()
export class CryptoRepository {

  constructor(private prismaService: PrismaService) {

  }

  public createCrypto(crypto: CryptoApi): Promise<Crypto> {
    return this.prismaService.crypto.create({
      data: {
        apiId: crypto.id,
        name: crypto.name,
        image: crypto.image.large,
        link: crypto.links.homepage[0],
        symbol: crypto.symbol,
        market_data: crypto.market_data as never,
        localization: crypto.localization as never,
      }
    })
  }

  public updateCrypto(crypto: Partial<CryptoApi>): Promise<Crypto> {
    return this.prismaService.crypto.update({
      where: {
        apiId: crypto.id,
      },
      data: {
        name: crypto.name,
        image: crypto.image?.large,
        market_data: crypto.market_data as never,
        localization: crypto.localization as never,
        symbol: crypto.symbol,
        link: crypto.links?.homepage[0],
      }
    });
  }

  public getAllCrypto() {
    return this.prismaService.crypto.findMany();
  }

  public getAllEnableCrypto() {
    return this.prismaService.crypto.findMany({
      where: {
        enable: true,
      }
    })
  }

  public getSpecificCrypto(cryptoIds: string[]) {
    return this.prismaService.crypto.findMany({
      where: {
        id: {
          in: cryptoIds
        }
      }
    })
  }

  public toggleCrypto(user: User, crypto: Crypto, enable: boolean) {
    return this.prismaService.crypto.update({
      where: {
        id: crypto.id,
      },
      data: {
        enable: enable,
      },
    })
  }

}
