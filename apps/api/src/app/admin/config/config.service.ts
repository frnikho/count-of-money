import {Injectable} from "@nestjs/common";
import {UpdateGlobalConfig} from "@count-of-money/shared";
import {ConfigRepository} from "./config.repository";
import {User} from '.prisma/client';
import {IsAdmin} from "../../user/user.pipe";

@Injectable()
export class ConfigService {

  constructor(private configRepository: ConfigRepository) {
  }

  public getGlobalConfigAdmin(@IsAdmin() user: User) {
    return this.configRepository.getGlobalConfig();
  }

  public getGlobalConfig() {
    return this.configRepository.getGlobalConfig();
  }

  public updateGlobalConfig(@IsAdmin() user: User, body: UpdateGlobalConfig) {
    return this.configRepository.updateGlobalConfig(body);
  }
}
