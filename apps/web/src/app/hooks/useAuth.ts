import {useContext} from "react";
import {UserContext} from "../context/UserContext";

export function useAuth() {

  const userContext = useContext(UserContext);

  return {
    ...userContext,
  }

}
