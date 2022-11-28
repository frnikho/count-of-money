import {Injectable} from "@nestjs/common";
import {PrismaService} from "../prisma/prisma.service";
import {AuthType, User} from '.prisma/client'

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
        password: '',
        authType: AuthType.Google,
      }
    })
  }


}
