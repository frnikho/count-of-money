import {Injectable} from "@nestjs/common";
import {LoginBody, LoginResponse, RegisterBody} from "@count-of-money/shared";
import {UserRepository} from "../user/user.repository";
import {AuthException} from "./auth.exception";
import {EncryptService} from "../credentials/encrypt.service";
import { JwtService } from '@nestjs/jwt';
import {User} from '.prisma/client';

@Injectable()
export class AuthService {

  constructor(private userRepository: UserRepository, private encryptService: EncryptService, private jwtService: JwtService) {
  }

  public async register(body: RegisterBody) {
    const user = await this.userRepository.findByEmail(body.email);
    if (user !== null)
      throw new AuthException('User already exists !');
    body.password = await this.encryptService.encrypt(body.password);
    return this.userRepository.create(body);
  }

  public async validate(body: LoginBody) {
    const user = await this.userRepository.findByEmail(body.email);
    if (user === null || user === undefined)
      throw new AuthException('User not found !');
    if (!await this.encryptService.compare(body.password, user.password))
      throw new AuthException('Invalid password !');
    return user;
  }

  public login(user: User): LoginResponse {
    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
      }),
      user: user,
    }
  }

}
