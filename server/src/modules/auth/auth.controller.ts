import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import omit from '../../helpers/omit';
import { findUserByEmail } from '../users/user.service';
import { LoginBody } from './auth.schema';
import { signJwt } from './auth.utils';

export async function loginHandler(req: Request<{}, {}, LoginBody>, res: Response) {
  const { email, password } = req.body;

  // find the user by email and verify password
  const user = await findUserByEmail(email);

  if (!user || !user.comparePassword(password)) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .send('Invalid email or password');
  }

  // sign a JWT
  const payload = omit(user.toJSON(), ['password', '__v']); //user has a bunch of Mongo stuff on it otherwise
  const jwt = signJwt(payload);

  // add a cookie to the response
  res.cookie('accessToken', jwt, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true, // hide from JS
    domain: process.env.DOMAIN || 'localhost',
    path: '/',
    sameSite: 'strict',
    secure: false, // TODO set to true if https
  });

  return res.status(StatusCodes.OK).send(jwt);
}
