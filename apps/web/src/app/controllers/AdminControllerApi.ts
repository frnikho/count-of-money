import {AddSourceBody, GlobalConfig, Source, UpdateGlobalConfig, UpdateSourceBody} from "@count-of-money/shared";
import api, {authorize} from "../utils/api";

export type ConfigCallback = (config?: GlobalConfig, error?: string) => void;
export type SourceCallback = (source?: Source, error?: string) => void;
export type SourcesCallback = (source: Source[], error?: string) => void;

export class AdminControllerApi {

  public static getGlobalConfig(accessToken: string, callback: ConfigCallback) {
    api.get<GlobalConfig>(`admin/config`, authorize(accessToken)).then((response) => {
      return callback(response.data, undefined);
    }).catch((err) => {
      callback(undefined, 'Une erreur est survenue !');
    });
  }

  public static getSources(accessToken: string, callback: SourcesCallback) {
    api.get<Source[]>(`admin/source`, authorize(accessToken)).then((response) => {
      return callback(response.data, undefined);
    }).catch((err) => {
      callback([], 'Une erreur est survenue !');
    });
  }

  public static getSource(accessToken: string, sourceId: string, callback: SourceCallback) {
    api.get<Source>(`admin/source/${sourceId}`, authorize(accessToken)).then((response) => {
      return callback(response.data, undefined);
    }).catch((err) => {
      callback(undefined, 'Une erreur est survenue !');
    });
  }

  public static createSource(accessToken: string, body: AddSourceBody, callback: SourceCallback) {
    api.post<Source>(`admin/source/`, body, authorize(accessToken)).then((response) => {
      return callback(response.data, undefined);
    }).catch((err) => {
      callback(undefined, 'Une erreur est survenue !');
    });
  }

  public static deleteSource(accessToken: string, sourceId: string, callback: SourceCallback) {
    api.delete<Source>(`admin/source/${sourceId}`, authorize(accessToken)).then((response) => {
      return callback(response.data, undefined);
    }).catch((err) => {
      callback(undefined, 'Une erreur est survenue !');
    });
  }

  public static updateSource(accessToken: string, sourceId: string, body: UpdateSourceBody, callback: SourceCallback) {
    api.patch<Source>(`admin/source/${sourceId}`, body, authorize(accessToken)).then((response) => {
      return callback(response.data, undefined);
    }).catch((err) => {
      callback(undefined, 'Une erreur est survenue !');
    });
  }

  public static updateGlobalConfig(accessToken: string, body: UpdateGlobalConfig, callback: ConfigCallback) {
    api.patch<GlobalConfig>(`admin/config`, body, authorize(accessToken)).then((response) => {
      return callback(response.data, undefined);
    }).catch((err) => {
      callback(undefined, 'Une erreur est survenue !');
    });
  }

}
