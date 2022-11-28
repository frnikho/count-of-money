import {Controller, Get, Patch} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('user', 'Preference')
@Controller('user/preference')
export class PreferenceController {

  @Get()
  public getMyPreference() {
    //TODO
  }

  @Patch()
  public updateMyPreference() {
    //TODO
  }

}
