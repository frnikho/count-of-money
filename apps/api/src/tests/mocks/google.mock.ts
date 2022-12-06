import {AuthGuard} from "@nestjs/passport";

export class GoogleGuardMock extends AuthGuard('google') {
  constructor() {
    super();
  }

  handleRequest(err, user) {
    return {
      ...user,
      user: {
        email: 'helloworld@gmail.com',
        picture: 'a',
        id: '123',
        firstName: 'Hello',
        lastName: 'World',
      },
      accessToken: '',
    }
  }
}
