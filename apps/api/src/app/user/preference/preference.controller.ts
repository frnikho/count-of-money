import {Controller, Get, Patch} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('User', 'Preference')
@Controller('user/preference')
export class PreferenceController {

  @Get()
  public getMyPreference() {

  }

  @Patch()
  public updateMyPreference() {

  }

}
