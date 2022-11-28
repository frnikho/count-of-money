import {ApiProperty} from "@nestjs/swagger";

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
