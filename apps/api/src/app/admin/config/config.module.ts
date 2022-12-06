import { Module } from "@nestjs/common";
import {ConfigService} from "./config.service";
import {ConfigRepository} from "./config.repository";
import {PrismaService} from "../../prisma/prisma.service";
import {ConfigController} from "./config.controller";

@Module({
  imports: [],
  controllers: [ConfigController],
  providers: [ConfigService, ConfigRepository, PrismaService],
  exports: [],
})
export class ConfigModule {

}
