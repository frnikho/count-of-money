import {Controller, Delete, Get, Patch} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('User')
@Controller('user')
export class UserController {

  @Get()
  public getMe() {

  }

  @Patch()
  public updateMe() {

  }

  @Delete()
  public deleteMe() {

  }

}
