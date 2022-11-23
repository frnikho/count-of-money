import {AuthGuard} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {AuthException} from "../auth.exception";

@Injectable()
export class GoogleGuard extends AuthGuard('google') {

  constructor() {
    super();
  }

  handleRequest(err, user) {
    if (!user)
      throw new AuthException('An google error occurred !');
    return user;
  }

}
