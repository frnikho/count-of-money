import {BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";

@Injectable()
export class CryptoPipe implements PipeTransform {

  constructor(private prismaService: PrismaService) {
  }

  async transform(value: string) {
    const crypto = await this.prismaService.crypto.findFirst({where: {id: value}});
    if (crypto === null || crypto === undefined)
      throw new BadRequestException('Invalid Crypto ID ');
    return crypto;
  }
}
