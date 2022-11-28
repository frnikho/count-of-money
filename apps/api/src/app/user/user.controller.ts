import {Controller, Delete, Get, Patch} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('user')
@Controller('user')
export class UserController {

  @Get()
  public getMe() {
    //TODO
  }

  @Patch()
  public updateMe() {
    //TODO
  }

  @Delete()
  public deleteMe() {
    //TODO
  }

}
