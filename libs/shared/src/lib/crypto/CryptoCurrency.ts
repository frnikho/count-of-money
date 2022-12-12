import {ApiProperty} from "@nestjs/swagger";

export type Charts = {
  prices: Data[];
  market_caps: Data[];
  total_volumes: Data[];
}

type Data = 2[];

export class CryptoCurrency {
  @ApiProperty()
  id: string;

  @ApiProperty()
  apiId: string;

  @ApiProperty()
  symbol: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  link: string;

  @ApiProperty()
  market_data: any;

  @ApiProperty()
  localization: unknown;

  @ApiProperty()
  charts: Charts;

  @ApiProperty()
  enable: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(id: string, apiId: string, symbol: string, name: string, image: string, link: string, market_data: unknown, localization: unknown, enable: boolean, createdAt: Date, charts: Charts, updatedAt: Date) {
    this.id = id;
    this.apiId = apiId;
    this.symbol = symbol;
    this.name = name;
    this.image = image;
    this.link = link;
    this.market_data = market_data;
    this.localization = localization;
    this.enable = enable;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.charts = charts;
  }
}


export class UpdateEnableCrypto {

  enableCrypto: string[];
  disableCrypto: string[];

  constructor(enableCrypto: string[], disableCrypto: string[]) {
    this.enableCrypto = enableCrypto;
    this.disableCrypto = disableCrypto;
  }
}
