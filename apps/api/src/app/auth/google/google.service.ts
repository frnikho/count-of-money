import {Injectable} from "@nestjs/common";
import {UserService} from "../../user/user.service";
import {AuthService} from "../auth.service";
import {GoogleLoginBody, GooglePayload, GoogleProfileResponse} from "@count-of-money/shared";
import axios from "axios";

@Injectable()
export class GoogleService {

  constructor(private authService: AuthService, private userService: UserService) {
  }

  public async login(req: GooglePayload) {
    return this.authService.login(await this.userService.loginGoogleAccount(req));
  }

  public async loginWithToken(body: GoogleLoginBody) {
    const response = await axios.get<GoogleProfileResponse>('https://www.googleapis.com/oauth2/v3/userinfo?alt=json', {headers: {Authorization: `Bearer ${body.access_token}`}});
    const data = response.data;
    const user = await this.userService.loginGoogleAccount({user: {email: data.email, picture: data.picture, firstName: data.given_name, lastName: data.family_name ?? ''}})
    return this.authService.login(user);
  }

}
