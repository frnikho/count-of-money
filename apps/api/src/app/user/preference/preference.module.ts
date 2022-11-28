import {Module} from "@nestjs/common";
import {PreferenceController} from "./preference.controller";
import {PreferenceService} from "./preference.service";
import {PreferenceRepository} from "./preference.repository";

@Module({
  imports: [],
  controllers: [PreferenceController],
  providers: [PreferenceService, PreferenceRepository],
  exports: [],
})
export class PreferenceModule {

}
