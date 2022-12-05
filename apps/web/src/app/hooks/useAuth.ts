import {useContext} from "react";
import {UserContext} from "../context/UserContext";

export function useAuth() {

  const userCtx = useContext(UserContext);

  return {
    ...userCtx,
  }

}
