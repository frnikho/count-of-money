import {Body, Controller, Delete, Get, Patch, Request, UseInterceptors} from "@nestjs/common";
import {ApiBearerAuth, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiServiceUnavailableResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {UserInterceptor} from "./user.interceptor";
import {UpdateUserBody, User} from "@count-of-money/shared";
import {UserService} from "./user.service";
import {ResponseError} from "@count-of-money/documentation";

@ApiTags('User')
@Controller('user')
export class UserController {

  constructor(private userService: UserService) {
  }

  @Get()
  @UseInterceptors(UserInterceptor)
  @ApiOkResponse({type: User})
  @ApiForbiddenResponse({description: `Forbidden, you don't have right to do that`, type: ResponseError})
  @ApiUnauthorizedResponse({description: 'Unauthorized, you need to be logged !', type: ResponseError})
  @ApiServiceUnavailableResponse({description: 'Service unavailable', type: ResponseError})
  @ApiInternalServerErrorResponse({description: 'An internal error occurred, please try again later !', type: ResponseError})
  @ApiBearerAuth()
  public getMe(@Request() req): Promise<User> {
    return req.user;
  }

  @Patch()
  @ApiOkResponse({type: User})
  @ApiForbiddenResponse({description: `Forbidden, you don't have right to do that`, type: ResponseError})
  @ApiUnauthorizedResponse({description: 'Unauthorized, you need to be logged !', type: ResponseError})
  @ApiServiceUnavailableResponse({description: 'Service unavailable', type: ResponseError})
  @ApiInternalServerErrorResponse({description: 'An internal error occurred, please try again later !', type: ResponseError})
  @ApiBearerAuth()
  public updateMe(@Request() req, @Body() body: UpdateUserBody) {
    return this.userService.updateUser(req.user, body);
  }

  @Delete()
  @ApiOkResponse({type: User})
  @ApiForbiddenResponse({description: `Forbidden, you don't have right to do that`, type: ResponseError})
  @ApiUnauthorizedResponse({description: 'Unauthorized, you need to be logged !', type: ResponseError})
  @ApiServiceUnavailableResponse({description: 'Service unavailable', type: ResponseError})
  @ApiInternalServerErrorResponse({description: 'An internal error occurred, please try again later !', type: ResponseError})
  @ApiBearerAuth()
  public deleteMe(@Request() req) {
    return this.userService.deleteUser(req.user)
  }

}
