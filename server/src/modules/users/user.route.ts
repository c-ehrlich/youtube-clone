import express from 'express';
import { processRequestBody } from 'zod-express-middleware';
import requireUser from '../../middleware/requireUser';
import { registerUserHandler } from './user.controller';
import { registerUserSchema } from './user.schema';

const router = express.Router();

// prefix: /api/users
router.get('/', requireUser, (_, res) => res.send(res.locals.user));
router.post(
  '/',
  processRequestBody(registerUserSchema.body),
  registerUserHandler
);

export default router;
