import {User, AuthType, Role} from ".prisma/client";

export const mockedUser: User = {
  id: '10fddf75-3424-47ba-93eb-04b369a5f78a',
  firstname: 'Hello',
  lastname: 'World',
  createdAt: new Date,
  updatedAt: new Date,
  email: 'helloworld@gmail.com',
  password: '358227',
  role: Role.User,
  authType: AuthType.Native,
}

export const mockedGoogleUser: User = {
  id: '10fddf75-3424-47ba-93eb-04b369a5f78a',
  firstname: 'Hello',
  lastname: 'World',
  createdAt: new Date,
  updatedAt: new Date,
  email: 'helloworldgoogle@gmail.com',
  password: '',
  role: Role.User,
  authType: AuthType.Google,
}
