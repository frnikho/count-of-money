import React, {useCallback, useEffect, useMemo, useState} from "react";
import {User} from "@count-of-money/shared";
import {AuthApiController} from "../controllers/AuthApiController";
import {useCookies} from "react-cookie";
import {UserApiController} from "../controllers/UserApiController";

export enum AuthState {
  Logged,
  NotLogged,
  Loading,
}

export type UserContextType = {
  user?: User;
  logout: () => void;
  login: (email: string, password: string, done?: (user: User, token: string) => void, errorCb?: (err: string) => void) => void;
  loginWithGoogle: (token: string, user: User) => void;
  reloadUser: (user?: User) => void;
  saveAccessToken: (token: string) => void;
  getAccessToken: () => string;
  authState: AuthState,
}

export const UserContext = React.createContext<UserContextType>({
  getAccessToken: () => '',
  login: () => null,
  loginWithGoogle: () => null,
  user: undefined,
  logout: () => null,
  reloadUser: () => null,
  saveAccessToken: () => null,
  authState: AuthState.Loading,
});

export const UserContextProvider = ({children}: React.PropsWithChildren) => {

  const [user, setUser] = useState<User | undefined>(undefined);
  const [accessToken, setAccessToken] = useState<string>('');
  const [authState, setAuthState] = useState<AuthState>(AuthState.Loading);
  const [cookies, setCookie, removeCookie] = useCookies(['at']);

  const saveAccessToken = useCallback((token: string) => {
    setCookie('at', token, {path: '/'});
    setAccessToken(token);
  }, [setCookie]);

  const getAccessToken = useMemo(() => {
    return accessToken;
  }, [accessToken]);

  const login = (email: string, password: string, done?: (user: User, token: string) => void, errorCb?: (err: string) => void) => {
    AuthApiController.nativeLogin({email, password}, (response, error) => {
      if (error && errorCb) {
        return errorCb('Une erreur est survenue !');
      } else if (!response?.user || ! response.accessToken) {
        errorCb && errorCb("Une erreur est survenue !");
      } else {
        saveAccessToken(response?.accessToken)
        reloadUser(response?.user);
        if (done)
          done(response?.user, response?.accessToken);
      }
    });
  };


  const logout = useCallback(() => {
    removeCookie('at')
    setAuthState(AuthState.NotLogged);
    setUser(undefined);
  }, [removeCookie]);

  const reloadUser = useCallback((user?: User, token?: string) => {
      if (user) {
        setUser(user);
        setAuthState(AuthState.Logged);
      } else if (token) {
        UserApiController.getLoggedUser(token, (user) => {
          if (user) {
            setUser(user);
            saveAccessToken(token);
          }
        });
      } else {
        UserApiController.getLoggedUser(accessToken, (user) => {
          if (user) {
            setUser(user);
          }
        });
      }
    }, [accessToken, saveAccessToken]);


  const loginWithGoogle = useCallback((accessToken: string, user: User) => {
    saveAccessToken(accessToken)
    reloadUser(user);
  }, [saveAccessToken, reloadUser]);

  useEffect(() => {
    if (cookies.at !== undefined) {
      UserApiController.getLoggedUser(cookies.at, (user) => {
        if (user) {
          reloadUser(user);
          setAccessToken(cookies.at);
        }
      });
    } else {
      setAuthState(AuthState.NotLogged);
    }
  }, [cookies.at, reloadUser, setAuthState, setAccessToken]);

  return (
    <UserContext.Provider value={{logout, loginWithGoogle, reloadUser, saveAccessToken, getAccessToken: () => getAccessToken, login, user, authState,}}>
      {children}
    </UserContext.Provider>
  );
};
