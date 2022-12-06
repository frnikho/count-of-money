import {ApiProperty} from "@nestjs/swagger";

export class GlobalConfig {
  @ApiProperty()
  articlesToShow: number;

  @ApiProperty()
  cryptoToShow: number;

  constructor(articlesToShow: number, cryptoToShow: number) {
    this.articlesToShow = articlesToShow;
    this.cryptoToShow = cryptoToShow;
  }
}

export class UpdateGlobalConfig {
  @ApiProperty()
  articlesToShow?: number;

  @ApiProperty()
  cryptoToShow?: number;

  constructor(articlesToShow: number, cryptoToShow: number) {
    this.articlesToShow = articlesToShow;
    this.cryptoToShow = cryptoToShow;
  }
}
