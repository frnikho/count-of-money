import {Module} from "@nestjs/common";
import {SourceModule} from "./source/source.module";
import {ConfigModule} from "./config/config.module";

@Module({
  imports: [SourceModule, ConfigModule],
  exports: [],
  providers: []
})
export class AdminModule {

}
