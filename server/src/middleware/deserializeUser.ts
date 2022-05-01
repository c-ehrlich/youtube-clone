import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../modules/auth/auth.utils';
// take cookie, deserialize it into a user, add to res.locals

function deserializeUser(req: Request, res: Response, next: NextFunction) {
  const accessToken = (
    req.headers.authorization ||
    req.cookies.accessToken ||
    ''
  ).replace(/^Bearer\s/, '');

  if (!accessToken) return next();

  const decoded = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
  }

  return next();
}

export default deserializeUser;
