import {ApiProperty} from "@nestjs/swagger";
import {User} from "../user/User";

export class LoginResponse {
  @ApiProperty()
  accessToken: string;

  @ApiProperty({type: User})
  user: User;

  constructor(accessToken: string, user: User) {
    this.accessToken = accessToken;
    this.user = user;
  }
}
