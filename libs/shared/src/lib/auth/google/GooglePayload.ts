export type GooglePayload = {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
  }
}

export type GoogleProfileResponse = {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
}
