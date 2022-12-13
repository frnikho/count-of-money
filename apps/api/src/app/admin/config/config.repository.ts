import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {UpdateGlobalConfig} from "@count-of-money/shared";

@Injectable()
export class ConfigRepository {

  constructor(private prismaService: PrismaService) {
  }

  public async getGlobalConfig() {
    const config = await this.prismaService.config.findFirst({
      where: {
        id: 'global'
      },
    });
    if (config === null) {
      return {
        articlesToShow: 5,
        cryptoToShow: 5,
      }
    }
    return config;
  }

  public async updateGlobalConfig(body: UpdateGlobalConfig) {
    if (await this.prismaService.config.findFirst({where: {id: 'global'}}) === null) {
      return this.prismaService.config.create({
        data: {
          id: 'global',
          articlesToShow: body.articlesToShow ?? 5,
          cryptoToShow: body.cryptoToShow ?? 5,
        }
      })
    }
    return this.prismaService.config.update({
      where: {
        id: 'global'
      },
      data: {
        cryptoToShow: body.cryptoToShow,
        articlesToShow: body.articlesToShow
      }
    })
  }

}
