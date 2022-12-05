import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../prisma/prisma.service";
import {AddSourceBody, UpdateSourceBody} from "@count-of-money/shared";
import {Source} from '.prisma/client';

@Injectable()
export class SourceRepository {

  constructor(private prismaService: PrismaService) {
  }

  public getAllSources() {
    return this.prismaService.source.findMany();
  }

  public getSource(id: string) {
    return this.prismaService.source.findFirst({where: {
      id: id
    }});
  }

  public deleteSource(source: Source) {
    return this.prismaService.source.delete({
      where: {
        id: source.id,
      },
    })
  }

  public deleteAllSource() {
    return this.prismaService.source.deleteMany();
  }

  public createSource(body: AddSourceBody) {
    return this.prismaService.source.create({
      data: {
        enable: body.enable,
        name: body.name,
        link: body.link,
      }
    })
  }

  public updateSource(source: Source, body: UpdateSourceBody) {
    return this.prismaService.source.update({
      where: {
        id: source.id,
      },
      data: {
        ...body,
      }
    })
  }

}
