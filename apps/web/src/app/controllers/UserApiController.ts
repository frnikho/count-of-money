import api, {authorize} from "../utils/api";
import {User} from "@count-of-money/shared";

export type UserCallback = (user?: User, error?: string) => void;

export class UserApiController {

  public static getLoggedUser(accessToken: string, callback: UserCallback) {
    api.get<User>('user', authorize(accessToken)).then((response) => {
      return callback(response.data);
    }).catch((err) => {
      callback(undefined, 'An error occurred !');
    });
  }
}
