import {ForbiddenException, Injectable, Param, PipeTransform} from "@nestjs/common";
import {User, Role} from ".prisma/client";

export function IsAdmin() {
  return Param(AdminGateway)
}


@Injectable()
export class AdminGateway implements PipeTransform {

  async transform(user: User) {
    if (user.role !== Role.Admin)
      throw new ForbiddenException('You need to be admin to do this !');
    return user;
  }
}
