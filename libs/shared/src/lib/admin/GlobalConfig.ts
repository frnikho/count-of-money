export class GlobalConfig {
  articlesToShow: number;
  cryptoToShow: number;

  constructor(articlesToShow: number, cryptoToShow: number) {
    this.articlesToShow = articlesToShow;
    this.cryptoToShow = cryptoToShow;
  }
}

export class UpdateGlobalConfig {
  articlesToShow?: number;
  cryptoToShow?: number;

  constructor(articlesToShow: number, cryptoToShow: number) {
    this.articlesToShow = articlesToShow;
    this.cryptoToShow = cryptoToShow;
  }
}
