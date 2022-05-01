import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { RegisterUserBody } from './user.schema';
import { createUser } from './user.service';

export async function registerUserHandler(req: Request<{}, {}, RegisterUserBody>, res: Response) {
  const { username, email, password } = req.body;
  
  console.log(req.body);
  
  try {
    await createUser({ username, email, password });

    return res.status(StatusCodes.CREATED).send('User created successfully');
    // TODO type this correctly
  } catch (e: any) {
    // if the code is 11000, we violated a unique property
    if (e.code === 11000) {
      return res.status(StatusCodes.CONFLICT).send('User already exists');
    }

    // We don't know what the error is, so just send it on
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
  }
}
