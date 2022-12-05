import {Body, Controller, Delete, Get, Patch, Request, UseInterceptors} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import {UserInterceptor} from "./user.interceptor";
import {UpdateUserBody} from "@count-of-money/shared";
import {UserService} from "./user.service";

@ApiTags('User')
@Controller('user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get()
  @UseInterceptors(UserInterceptor)
  public getMe(@Request() req) {
    return req.user;
  }

  @Patch()
  public updateMe(@Request() req, @Body() body: UpdateUserBody) {
    return this.userService.updateUser(req.user, body);
  }

  @Delete()
  public deleteMe(@Request() req) {
    return this.userService.deleteUser(req.user)
  }

}
