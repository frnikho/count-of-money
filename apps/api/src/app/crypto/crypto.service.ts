import {Injectable} from "@nestjs/common";
import {User, Crypto, Role} from ".prisma/client";
import {CryptoRepository} from "./crypto.repository";
import {IsAdmin} from "../user/user.pipe";

@Injectable()
export class CryptoService {

  constructor(private cryptoRepository: CryptoRepository) {
  }

  public getAllCrypto(user: User): Promise<Crypto[]> {
    if (user.role === Role.Admin)
      return this.cryptoRepository.getAllCrypto();
    return this.cryptoRepository.getAllEnableCrypto();
  }

  public getCrypto(user: User, crypto: Crypto) {
    console.log(user.role);
    return crypto;
  }

  public toggleCrypto(@IsAdmin() user: User, crypto: Crypto, enable: boolean) {
    return this.cryptoRepository.toggleCrypto(user, crypto, enable);
  }

}
