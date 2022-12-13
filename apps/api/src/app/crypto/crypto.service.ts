import {Injectable} from "@nestjs/common";
import {User, Crypto, Role} from ".prisma/client";
import {CryptoRepository} from "./crypto.repository";
import {IsAdmin} from "../user/user.pipe";
import {UpdateEnableCrypto} from "@count-of-money/shared";

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
    return crypto;
  }

  public getCryptoById(user: User, cryptoId: string) {
    return this.cryptoRepository.getCryptoById(cryptoId);
  }

  public toggleCrypto(@IsAdmin() user: User, crypto: Crypto, enable: boolean) {
    return this.cryptoRepository.toggleCrypto(user, crypto, enable);
  }

  public async updateCrypto(@IsAdmin() user: User, body: UpdateEnableCrypto) {
    for (const c of body.disableCrypto) {
      await this.cryptoRepository.updateCryptoWithApiId(c, false);
    }
    for (const c of body.enableCrypto) {
      await this.cryptoRepository.updateCryptoWithApiId(c, true);
    }
  }

  public getRestrictedCrypto() {
    return this.cryptoRepository.getRestrictedCrypto();
  }
}
