import { object, string, TypeOf } from 'zod';

export const registerUserSchema = {
  body: object({
    username: string({
      required_error: 'username is required',
    }),
    email: string({
      required_error: 'username is required',
    }),
    password: string({
      required_error: 'username is required',
    })
      .min(6, 'Password must be at least 6 characters long')
      .max(64, 'Password should not be longer than 64 characters'),
    confirmPassword: string({
      required_error: 'username is required',
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ["confirmPassword'"],
  }),
  // our request doesn't have params
  // params: {},
};
export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;
