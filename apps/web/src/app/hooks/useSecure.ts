import {useAuth} from "./useAuth";
import {useEffect} from "react";
import {AuthState} from "../contexts/UserContext";
import {useNavigate} from "react-router-dom";

type SecureOptions = {
  redirectUrl: string;
}

const defaultSecureOptions: SecureOptions = {
  redirectUrl: '/auth'
}

export function useSecure(options = defaultSecureOptions) {

  const navigate = useNavigate();
  const {authState} = useAuth();

  useEffect(() => {
    if (authState === AuthState.NotLogged) {
      navigate(options.redirectUrl);
    }
  }, [navigate, authState, options]);

  return {

  }

}
