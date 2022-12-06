import {ArrayMinSize, IsOptional, Length} from "class-validator";

export class CryptoList {

}

export class CreateCryptoListBody {

  @Length(1, 64)
  name: string;

  @ArrayMinSize(1)
  cryptos: string[];

  constructor(name: string, cryptos: string[]) {
    this.name = name;
    this.cryptos = cryptos;
  }
}

export class UpdateCryptoListBody {
  @Length(1, 64)
  @IsOptional()
  name?: string;

  @ArrayMinSize(1)
  @IsOptional()
  cryptos?: string[];

  constructor(name: string, cryptos: string[]) {
    this.name = name;
    this.cryptos = cryptos;
  }
}
