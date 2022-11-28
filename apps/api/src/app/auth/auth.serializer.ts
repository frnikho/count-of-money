import {PassportSerializer} from "@nestjs/passport";

export class AuthSerializer extends PassportSerializer {
  deserializeUser(payload: unknown, done: (err, user) => void) {
    done(null, payload);
  }

  serializeUser(user, done: (err, payload) => void) {
    done(null, user.id);
  }

}
