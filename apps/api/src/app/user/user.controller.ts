import {Controller, Delete, Get, Patch, Request, UseInterceptors} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {UserInterceptor} from "./user.interceptor";

@ApiTags('User')
@Controller('user')
export class UserController {

  @Get()
  @UseInterceptors(UserInterceptor)
  public getMe(@Request() req) {
    return req.user;
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
