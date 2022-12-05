import api from "../utils/api";
import {LoginBody, LoginResponse, RegisterBody, User} from "@count-of-money/shared";

export type GoogleRedirectParams = {
  code: string;
  prompt: string;
  authuser: number;
  scope: string;
}

export type GoogleCallback = (response?: LoginResponse, error?: string) => void;
export type AuthCallback = (response?: LoginResponse, error?: string) => void;
export type RegisterCallback = (response?: User, error?: string) => void;

export class AuthApiController {

  public static redirectGoogleLogin = (params: GoogleRedirectParams, callback: GoogleCallback): void => {
    api.get(`/auth/google/redirect?code=${params.code}&authuser=${params.authuser}&scope=${params.scope}&prompt=${params.prompt}`, ).then((response) => {
      console.log(response.data);
    }).catch((err) => {
      console.log(err);
    });
  }

  public static nativeLogin = (body: LoginBody, callback: AuthCallback): void => {
    api.post<LoginResponse>(`/auth/login`, body).then((response) => {
      callback(response.data);
    }).catch((err) => {
      callback(undefined, "Une erreur est survenue !");
    });
  }

  public static nativeRegister = (body: RegisterBody, callback: RegisterCallback): void => {
    api.post<User>(`/auth/register`, body).then((response) => {
      callback(response.data);
    }).catch((err) => {
      callback(undefined, "Une erreur est survenue !");
    });
  }

}