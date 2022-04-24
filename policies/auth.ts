import { Request, Response } from 'express';
import { Utils } from '../utils/Utils';

export const CustomAuth = async (req: Request, res: Response, next: any) => {
  // Verificamos conexión autorizada
  const token = Utils.recoverToken(req);
  if (!token) {
    return res.sendStatus(401);
  }

  // Verificamos autorización
  const userRaw = await Utils.verifyToken(token);
  if (!userRaw) {
    return res.sendStatus(401);
  }

  // const user = User.build(userRaw);
  // req. ('user', user.accountNumber);
  // return Promise.resolve(token);
  req.session.user = userRaw;
  return next();
};
