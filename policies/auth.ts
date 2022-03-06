import { Request, Response } from 'express';
import { Utils } from '../utils/Utils';

export const CustomAuth = async (req: Request, res: Response, next: any) => {
  let token: string = '';

  // Verificamos conexión autorizada
  if (req.headers && req.headers.authorization) {
    //authorization header is present
    var parts = req.headers.authorization.split(' ');
    if (parts.length == 2) {
      var scheme = parts[0];
      var credentials = parts[1];

      if (/^Bearer$/i.test(scheme)) {
        token = credentials;
      }
    }
  }
  if (token === '') {
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
