import {useAuth} from "./useAuth";
import {useEffect} from "react";
import {AuthState} from "../contexts/UserContext";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

type SecureOptions = {
  redirectUrl: string;
  showToast: boolean;
}

const defaultSecureOptions: SecureOptions = {
  redirectUrl: '/auth',
  showToast: true,
}

export function useSecure(options = defaultSecureOptions) {

  const navigate = useNavigate();
  const {authState} = useAuth();

  useEffect(() => {
    if (authState === AuthState.NotLogged) {
      navigate(options.redirectUrl);
      if (options.showToast) {
        toast('Vous devez être connecter pour accéder a ce contenu !', {type: 'warning'})
      }
    }
  }, [navigate, authState, options]);

  return {

  }

}
