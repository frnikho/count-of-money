import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, Length} from "class-validator";

export class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  email: string;

  @ApiProperty({default: new Date()})
  createdAt: Date;

  @ApiProperty({default: new Date()})
  updatedAt: Date;

  constructor(id: string, firstname: string, lastname: string, email: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}


export class UpdateUserBody {
  @IsOptional()
  @ApiProperty()
  @Length(1, 64)
  firstname?: string;

  @IsOptional()
  @ApiProperty()
  @Length(1, 64)
  lastname?: string;

  constructor(firstname: string, lastname: string) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}
