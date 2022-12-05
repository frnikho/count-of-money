import {Module} from "@nestjs/common";
import {SourceController} from "./source.controller";
import {PrismaService} from "../../prisma/prisma.service";
import {SourceService} from "./source.service";
import {SourceRepository} from "./source.repository";

@Module({
  controllers: [SourceController],
  imports: [],
  exports: [],
  providers: [PrismaService, SourceService, SourceRepository]
})
export class SourceModule {

}
