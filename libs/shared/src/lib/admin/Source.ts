import {ApiProperty} from "@nestjs/swagger";
import {IsNotEmpty, Length} from "class-validator";

export class Source {

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  link: string;

  @ApiProperty()
  enable: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(id: string, name: string, link: string, enable: boolean, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.name = name;
    this.link = link;
    this.enable = enable;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export class AddSourceBody {

  @Length(1, 128)
  name: string;

  @Length(4, 512)
  link: string;

  @IsNotEmpty()
  enable: boolean;

  constructor(name: string, link: string, enable: boolean) {
    this.name = name;
    this.link = link;
    this.enable = enable;
  }
}

export class UpdateSourceBody {
  name?: string;
  link?: string;
  enable?: boolean;

  constructor(name: string, link: string, enable: boolean) {
    this.name = name;
    this.link = link;
    this.enable = enable;
  }
}
