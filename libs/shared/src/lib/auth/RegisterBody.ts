import {IsEmail} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RegisterBody {
  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  constructor(firstname: string, lastname: string, password: string, email: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.password = password;
    this.email = email;
  }
}
