import {useContext} from "react";
import {UserContext} from "../contexts/UserContext";

export function useAuth() {

  const userContext = useContext(UserContext);

  return {
    ...userContext,
  }

}
