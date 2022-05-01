import { User, UserModel } from './user.model';

export async function createUser(
  user: Pick<User, 'username' | 'email' | 'password'>
) {
  return UserModel.create(user);
}

export async function findUserByEmail(email: User['email']) {
  return UserModel.findOne({ email });
}
