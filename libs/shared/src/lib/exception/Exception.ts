import {ApiProperty} from "@nestjs/swagger";

export class Exception {
  @ApiProperty()
  statusCode: number;

  @ApiProperty({example: 'User already exist', type: String})
  message: string | string[];

  @ApiProperty()
  error: string;

  constructor(statusCode: number, message: string | string[], error: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}
