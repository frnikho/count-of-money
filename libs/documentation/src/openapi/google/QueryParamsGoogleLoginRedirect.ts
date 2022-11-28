import {ApiProperty} from "@nestjs/swagger";

export class QueryParamsGoogleLoginRedirect {

  @ApiProperty()
  code: string;

  @ApiProperty()
  prompt: string;

  @ApiProperty()
  authuser: number;

  @ApiProperty()
  scope: string;

  constructor(code: string, prompt: string, authuser: number, scope: string) {
    this.code = code;
    this.prompt = prompt;
    this.authuser = authuser;
    this.scope = scope;
  }
}
