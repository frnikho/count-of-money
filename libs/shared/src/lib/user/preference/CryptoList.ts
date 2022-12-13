import {ArrayMinSize, IsOptional, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {CryptoCurrency} from "../../crypto/CryptoCurrency";

export class CryptoList {

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cryptos: CryptoCurrency[];

  constructor(name: string, cryptos: CryptoCurrency[], id: string) {
    this.name = name;
    this.cryptos = cryptos;
    this.id = id;
  }
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
