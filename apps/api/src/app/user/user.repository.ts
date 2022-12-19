import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {AuthType, User} from '.prisma/client'
import {UpdateUserBody} from "@count-of-money/shared";

@Injectable()
export class UserRepository {

  constructor(private prisma: PrismaService) {}

  public findByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      }
    });
  }

  public findById(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id,
      }
    });
  }

  public async create(user: Pick<User, 'email' | 'lastname' | 'firstname' | 'password'>) {
    return this.prisma.user.create({
      data: {
        ...user,
        preference: {
          create: {}
        },
      }});
  }

  public async createGoogleAccount(user: Pick<User, 'email' | 'firstname' | 'lastname'>) {
    return this.prisma.user.create({
      data: {
        ...user,
        preference: {
          create: {}
        },
        password: '',
        authType: AuthType.Google,
      }
    })
  }

  public async update(user: User, body: UpdateUserBody) {
    return this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        firstname: body.firstname,
        lastname: body.lastname,
      }
    })
  }

  public async delete(user: User) {
    return this.prisma.user.delete({
      where: {
        id: user.id
      }
    });
  }

}
