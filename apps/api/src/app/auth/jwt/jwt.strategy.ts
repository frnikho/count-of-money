import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserRepository} from "../../user/user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.APP_SECRET,
    });
  }

  public async validate(payload) {
    const user = await this.userRepository.findById(payload.sub);
    if (!user)
      throw new UnauthorizedException('Invalid user ID !');
    return user;
  }
}
