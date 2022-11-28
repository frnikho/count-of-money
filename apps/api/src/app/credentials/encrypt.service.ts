import {Injectable} from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {

  public encrypt(password: string) {
    return bcrypt.hash(password, bcrypt.genSaltSync(10))
  }

  public compare(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }

}
