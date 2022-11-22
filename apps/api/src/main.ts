import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {PrismaService} from "./app/prisma/prisma.service";
import {NestExpressApplication} from "@nestjs/platform-express";
import helmet from "helmet";
import * as csurf from 'csurf';

class Server {

  private app: NestExpressApplication;

  public async start() {
    this.app = await NestFactory.create<NestExpressApplication>(AppModule);
    await this.config();
    await this.app.listen(parseInt(process.env.PORT) || 4200);
  }

  public async config() {
    const prismaService = this.app.get(PrismaService);
    await prismaService.enableShutdownHooks(this.app);
    this.app.enableCors({
      origin: process.env.CORS_URL
    });
    this.app.use(helmet());
    this.app.use(csurf())
  }

}

new Server().start();
