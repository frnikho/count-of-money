import {ApiProperty} from "@nestjs/swagger";

export class LoginBody {
  @ApiProperty({required: true})
  email: string;

  @ApiProperty({required: true})
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export class GoogleLoginBody {
  access_token: string;
  scope: string;
  token_type: string;

  constructor(access_token: string, scope: string, token_type: string) {
    this.access_token = access_token;
    this.scope = scope;
    this.token_type = token_type;
  }
}
