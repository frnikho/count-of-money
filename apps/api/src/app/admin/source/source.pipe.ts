import {BadRequestException, Injectable, PipeTransform} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";

@Injectable()
export class SourcePipe implements PipeTransform {

  constructor(private prismaService: PrismaService) {
  }

  async transform(value: string) {
    const source = await this.prismaService.source.findFirst({where: {id: value}});
    if (source === null || source === undefined)
      throw new BadRequestException('Invalid Source ID ');
    return source;
  }
}
