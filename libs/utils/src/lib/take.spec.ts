import {take} from "../lib/take";
import {User} from "@count-of-money/shared";

describe('utils', () => {
  it('should work', () => {
    const user: User = {lastname: 'Hello World', firstname: '', id: '1324', email: '', createdAt: new Date, updatedAt: new Date()};
    const newObj = take(user, ['lastname', 'id']);
    expect(newObj.lastname).not.toBeNull();
    expect(newObj.email).toBeUndefined();
  });
});
