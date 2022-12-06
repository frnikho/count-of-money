import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-local";
import {AuthService} from "../auth.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class NativeStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({usernameField: 'email', passwordField: 'password'});
  }

  public async validate(email: string, password: string) {
    return this.authService.validate({email: email, password: password});
  }
}
