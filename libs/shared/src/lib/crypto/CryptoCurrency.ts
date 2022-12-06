import {ApiProperty} from "@nestjs/swagger";

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
  enable: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(id: string, apiId: string, symbol: string, name: string, image: string, link: string, market_data: unknown, localization: unknown, enable: boolean, createdAt: Date, updatedAt: Date) {
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
  }
}
