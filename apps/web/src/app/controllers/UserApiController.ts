import api, {authorize} from "../utils/api";
import {CreateCryptoListBody, CryptoList, UpdateCryptoListBody, User} from "@count-of-money/shared";

export type UserCallback = (user?: User, error?: string) => void;
export type CryptoListsCallback = (cryptoList?: CryptoList[], error?: string) => void;
export type CryptoListCallback = (cryptoList?: CryptoList, error?: string) => void;

export class UserApiController {

  public static getLoggedUser(accessToken: string, callback: UserCallback) {
    api.get<User>('user', authorize(accessToken)).then((response) => {
      return callback(response.data);
    }).catch(() => {
      callback(undefined, `Une erreur est survenue lors de la récupération des informations de l'utilisateur`);
    });
  }

  public static getCryptoList(accessToken: string, callback: CryptoListsCallback) {
    api.get<CryptoList[]>(`user/preference/crypto/list`, authorize(accessToken)).then((response) => {
      return callback(response.data);
    }).catch(() => {
      callback(undefined, `Une erreur est survenue lors de la récupération de la list de crypto `);
    });
  }

  public static createCryptoList(accessToken: string, body: CreateCryptoListBody, callback: CryptoListCallback) {
    api.post<CryptoList>(`user/preference/crypto/list`, body, authorize(accessToken), ).then((response) => {
      return callback(response.data);
    }).catch(() => {
      callback(undefined, `Une erreur est survenue lors de la récupération de la list de crypto `);
    });
  }

  public static updateCryptoList(accessToken: string, cryptoList: string, body: UpdateCryptoListBody, callback: CryptoListCallback) {
    api.patch<CryptoList>(`user/preference/crypto/list/${cryptoList}`, body, authorize(accessToken), ).then((response) => {
      return callback(response.data);
    }).catch(() => {
      callback(undefined, `Une erreur est survenue lors de la récupération de la list de crypto `);
    });
  }

  public static deleteCryptoList(accessToken: string, cryptoListId: string, callback: CryptoListCallback) {
    api.delete<CryptoList>(`user/preference/crypto/list/${cryptoListId}`, authorize(accessToken)).then((response) => {
      return callback(response.data);
    }).catch(() => {
      return callback(undefined, 'Une erreur est survenue !')
    });
  }

}
