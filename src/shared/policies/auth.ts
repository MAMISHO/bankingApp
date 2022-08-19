import { Request, Response } from 'express';
import { BasicUserDTO } from '../../modules/users/dtos/user.dto';
import { UserRoleType } from '../../modules/users/entities/user.enum';
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
  const basicUserDTO = new BasicUserDTO(userRaw);

  // const user = User.build(userRaw);
  // req. ('user', user.accountNumber);
  // return Promise.resolve(token);
  req.session.user = basicUserDTO;
  return next();
};

export const CustomAuthRoleAdmin = async (req: Request, res: Response, next: any) => {
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
  const basicUserDTO = new BasicUserDTO(userRaw);

  // const user = User.build(userRaw);
  // req. ('user', user.accountNumber);
  // return Promise.resolve(token);
  if (basicUserDTO.role !== UserRoleType.ADMIN) {
    return res.sendStatus(401);
  }
  req.session.user = basicUserDTO;
  return next();
};
