import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {CreateCryptoListBody, UpdateCryptoListBody} from "@count-of-money/shared";
import {User, CryptoList} from '.prisma/client';

@Injectable()
export class PreferenceRepository {

  constructor(private prismaService: PrismaService) {
  }

  public createCryptoList(user: User, body: CreateCryptoListBody) {
    return this.prismaService.cryptoList.create({
      data: {
        name: body.name,
        userId: user.id,
        cryptos: {
          connect: [...body.cryptos.map((c) => ({id: c}))]
        },
        default: false,
      },
      include: {
        cryptos: {
          select: {
            apiId: true,
            symbol: true,
            link: true,
            enable: true,
            image: true,
          }
        },
      },
    })
  }

  public async getCryptoList(user: User) {
    return this.prismaService.cryptoList.findMany({
      where: {
        userId: user.id
      },
      include: {
        cryptos: true,
      },
    });
  }

  public deleteCryptoList(user: User, cryptoList: CryptoList) {
    return this.prismaService.cryptoList.delete({
      where: {
        id: cryptoList.id,
      },
    })
  }

  public async updateCryptoList(user: User, cryptoList: CryptoList, body: UpdateCryptoListBody) {
    return this.prismaService.cryptoList.update({
      where: {
        id: cryptoList.id
      },
      data: {
        name: body.name,
        cryptos: {
          set: [...body?.cryptos?.map((c) => ({id: c})) ?? []],
        },
      },
      select: {
        cryptos: {}
      }
    })
  }

}
