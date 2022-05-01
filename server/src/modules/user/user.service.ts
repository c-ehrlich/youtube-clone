import { User, UserModel } from './user.model';

export async function createUser(
  user: Pick<User, 'username' | 'email' | 'password'>
) {
  return UserModel.create(user);
}
