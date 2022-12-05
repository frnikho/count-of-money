import {Body, Controller, Get, Patch, Request} from "@nestjs/common";
import {UpdateGlobalConfig} from "@count-of-money/shared";
import {ConfigService} from "./config.service";
import {ApiTags} from "@nestjs/swagger";

@Controller('admin/config')
@ApiTags('Admin')
export class ConfigController {

  constructor(private configService: ConfigService) {
  }

  @Get()
  public getConfig(@Request() req) {
    return this.configService.getGlobalConfigAdmin(req.user);
  }

  @Patch()
  public updateConfig(@Request() req, @Body() body: UpdateGlobalConfig) {
    return this.configService.updateGlobalConfig(req.user, body);
  }

}
