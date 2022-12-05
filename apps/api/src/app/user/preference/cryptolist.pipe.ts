import {BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class CryptoListPipe implements PipeTransform {

  constructor(private prismaService: PrismaService) {
  }

  async transform(value: string) {
    const crypto = await this.prismaService.cryptoList.findFirst({where: {id: value}, include: {cryptos: true}});
    if (crypto === null || crypto === undefined)
      throw new BadRequestException('Invalid Crypto List ID ');
    return crypto;
  }
}
