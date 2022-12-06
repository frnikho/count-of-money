import {ApiProperty} from "@nestjs/swagger";

export class ResponseError {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string | string[];

  @ApiProperty()
  error?: string;

  constructor(statusCode: number, message: string | string[], error: string) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
  }
}
