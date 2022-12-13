import {CryptoCurrency, UpdateEnableCrypto} from "@count-of-money/shared";
import api, {authorize} from "../utils/api";

export type CryptosCallback = (crypto: CryptoCurrency[], error?: string) => void;
export type CryptoCallback = (crypto?: CryptoCurrency, error?: string) => void;

export class CryptoControllerApi {

  public static getAll(accessToken: string, callback: CryptosCallback) {
    api.get<CryptoCurrency[]>(`crypto/all`, authorize(accessToken)).then((response) => {
      return callback(response.data);
    }).catch(() => {
      return callback([], 'Une erreur est survenue !');
    })
  }

  public static getPublic(callback: CryptosCallback) {
    api.get<CryptoCurrency[]>(`crypto/public`).then((response) => {
      return callback(response.data);
    }).catch(() => {
      return callback([], 'Une erreur est survenue !');
    })
  }

  public static get(accessToken: string, cryptoId: string, callback: CryptoCallback) {
    api.get<CryptoCurrency>(`crypto/${cryptoId}`, authorize(accessToken)).then((response) => {
      return callback(response.data);
    }).catch(() => {
      return callback(undefined, 'Une erreur est survenue !');
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
