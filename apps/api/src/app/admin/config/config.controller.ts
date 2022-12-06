import {Body, Controller, Get, Patch, Request} from "@nestjs/common";
import {GlobalConfig, UpdateGlobalConfig} from "@count-of-money/shared";
import {ConfigService} from "./config.service";
import {ApiBearerAuth, ApiForbiddenResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiServiceUnavailableResponse, ApiTags, ApiUnauthorizedResponse} from "@nestjs/swagger";
import {ResponseError} from "@count-of-money/documentation";

@Controller('admin/config')
@ApiTags('Admin')
export class ConfigController {

  constructor(private configService: ConfigService) {
  }

  @Get()
  @ApiOkResponse({type: GlobalConfig})
  @ApiForbiddenResponse({description: `Forbidden, you don't have right to do that`, type: ResponseError})
  @ApiUnauthorizedResponse({description: 'Unauthorized, you need to be logged !', type: ResponseError})
  @ApiServiceUnavailableResponse({description: 'Service unavailable', type: ResponseError})
  @ApiInternalServerErrorResponse({description: 'An internal error occurred, please try again later !', type: ResponseError})
  @ApiBearerAuth()
  public getConfig(@Request() req): Promise<GlobalConfig> {
    return this.configService.getGlobalConfigAdmin(req.user);
  }

  @Patch()
  @ApiOkResponse({type: GlobalConfig})
  @ApiForbiddenResponse({description: `Forbidden, you don't have right to do that`, type: ResponseError})
  @ApiUnauthorizedResponse({description: 'Unauthorized, you need to be logged !', type: ResponseError})
  @ApiServiceUnavailableResponse({description: 'Service unavailable', type: ResponseError})
  @ApiInternalServerErrorResponse({description: 'An internal error occurred, please try again later !', type: ResponseError})
  @ApiBearerAuth()
  public updateConfig(@Request() req, @Body() body: UpdateGlobalConfig): Promise<GlobalConfig> {
    return this.configService.updateGlobalConfig(req.user, body);
  }

}
