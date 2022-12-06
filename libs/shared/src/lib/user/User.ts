import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, Length} from "class-validator";
import {Role} from "../Role";

export class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  firstname: string;

  @ApiProperty()
  lastname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: Role;

  @ApiProperty({default: new Date()})
  createdAt: Date;

  @ApiProperty({default: new Date()})
  updatedAt: Date;

  constructor(id: string, firstname: string, lastname: string, email: string, createdAt: Date, updatedAt: Date, role: Role) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.role = role;
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
