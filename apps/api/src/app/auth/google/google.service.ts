import {Injectable} from "@nestjs/common";
import {UserService} from "../../user/user.service";
import {AuthService} from "../auth.service";
import {GooglePayload} from "@count-of-money/shared";

@Injectable()
export class GoogleService {

  constructor(private authService: AuthService, private userService: UserService) {
  }

  public async login(req: GooglePayload) {
    return this.authService.login(await this.userService.loginGoogleAccount(req));
  }

}
