import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { UserDoc } from '../../models/types/user';

export const generateJWT = (req: Request, user: UserDoc) => {
  // Generate JWT
  const userJwt = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!
  );
  // Store it on session object
  req.session = {
    jwt: userJwt,
  };
};
