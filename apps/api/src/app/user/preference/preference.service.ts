import {Injectable} from "@nestjs/common";
import {PreferenceRepository} from "./preference.repository";
import {CreateCryptoListBody, UpdateCryptoListBody} from "@count-of-money/shared";
import {User, CryptoList} from '.prisma/client';

@Injectable()
export class PreferenceService {

  constructor(private repo: PreferenceRepository) {
  }

  public createCryptoList(user: User, body: CreateCryptoListBody) {
    return this.repo.createCryptoList(user, body);
  }

  public getCrypto(user: User, crypto: CryptoList) {
    return crypto;
  }

  public getCryptoList(user: User) {
    return this.repo.getCryptoList(user);
  }

  public deleteCryptoList(user: User, cryptoList: CryptoList) {
    return this.repo.deleteCryptoList(user, cryptoList);
  }

  public updateCryptoList(user: User, cryptoList: CryptoList, body: UpdateCryptoListBody) {
    return this.repo.updateCryptoList(user, cryptoList, body);
  }

}
