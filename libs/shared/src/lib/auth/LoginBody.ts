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
