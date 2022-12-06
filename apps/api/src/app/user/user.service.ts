import {Injectable} from "@nestjs/common";
import {UserRepository} from "./user.repository";
import {GooglePayload, UpdateUserBody} from "@count-of-money/shared";
import {User} from '.prisma/client';

@Injectable()
export class UserService {

  constructor(private userRepository: UserRepository) {
  }

  public async loginGoogleAccount(googlePayload: GooglePayload): Promise<User> {
    const user = await this.userRepository.findByEmail(googlePayload.user.email);
    if (user === null || user === undefined) {
      return await this.userRepository.createGoogleAccount({
        lastname: googlePayload.user.lastName,
        email: googlePayload.user.email,
        firstname: googlePayload.user.firstName,
      });
    }
    return user;
  }

  public updateUser(user: User, body: UpdateUserBody) {
    return this.userRepository.update(user, body);
  }

  public deleteUser(user: User) {
    return this.userRepository.delete(user);
  }

}
