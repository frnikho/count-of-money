import {CryptoCurrency, UpdateEnableCrypto} from "@count-of-money/shared";
import api, {authorize} from "../utils/api";

export type CryptoCallback = (crypto: CryptoCurrency[], error?: string) => void;

export class CryptoControllerApi {

  public static getAll(accessToken: string, callback: CryptoCallback) {
    api.get(`crypto/all`, authorize(accessToken)).then((response) => {
      return callback(response.data);
    }).catch((err) => {
      return callback([], 'Une erreur est survenue !');
    })
  }

  public static updateEnable(accessToken: string, body: UpdateEnableCrypto, callback: (error?: string) => void) {
    api.patch(`crypto`, body, authorize(accessToken)).then(() => {
      return callback();
    }).catch(() => {
      return callback('Une erreur est survenue !');
    })
  }

}
