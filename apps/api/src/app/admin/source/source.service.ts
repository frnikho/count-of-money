import {Injectable} from "@nestjs/common";
import {SourceRepository} from "./source.repository";
import {AddSourceBody, Source, UpdateSourceBody, User} from "@count-of-money/shared";
import {IsAdmin} from "../../user/user.pipe";

@Injectable()
export class SourceService {

  constructor(private sourceRepository: SourceRepository) {
  }

  public getSource(@IsAdmin() user: User, source: Source) {
    return source;
  }

  public getAllSources(@IsAdmin() user: User) {
    return this.sourceRepository.getAllSources();
  }

  public deleteSource(@IsAdmin() user: User, source: Source) {
    return this.sourceRepository.deleteSource(source);
  }

  public deleteAllSource(@IsAdmin() user: User) {
    return this.sourceRepository.deleteAllSource();
  }

  public createSource(@IsAdmin() user: User, body: AddSourceBody) {
    return this.sourceRepository.createSource(body);
  }

  public updateSource(@IsAdmin() user: User, source: Source, body: UpdateSourceBody) {
    return this.sourceRepository.updateSource(source, body);
  }


}
