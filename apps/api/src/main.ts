import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {PrismaService} from "./app/prisma/prisma.service";
import {NestExpressApplication} from "@nestjs/platform-express";
import helmet from "helmet";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {ValidationPipe} from "@nestjs/common";

class Server {

  private app: NestExpressApplication;

  public async start() {
    this.app = await NestFactory.create<NestExpressApplication>(AppModule);
    await this.config();
    this.configureOpenApi();
    await this.app.listen(parseInt(process.env.PORT ?? "4200"));
  }

  public async config() {
    const prismaService = this.app.get(PrismaService);
    await prismaService.enableShutdownHooks(this.app);
    this.app.enableCors({
      origin: process.env.CORS_URL
    });
    this.app.use(helmet());
    this.app.useGlobalPipes(new ValidationPipe());
  }

  public configureOpenApi() {
    const config = new DocumentBuilder()
      .setTitle('Count the Money')
      .setDescription('Count the Money - a Epitech Projet')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(this.app, config);
    SwaggerModule.setup('api', this.app, document);
  }

}

new Server().start();
