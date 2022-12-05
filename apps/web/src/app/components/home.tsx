import {useAuth} from "../hooks/useAuth";
import {useSecure} from "../hooks/useSecure";

export function Home() {

  useSecure();
  const {user} = useAuth();

    return (
      <div>Bienvenue {user?.firstname}</div>
    );
  }
