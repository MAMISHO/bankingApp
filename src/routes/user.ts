import express, { Request, Response } from 'express';
import { IConn } from '../../models/connection';
import { Role, User } from '../../models/user';
import { CustomAuth } from '../../policies/auth';
import { UserRepository } from '../repositories/user.repository';

const router = express.Router();
const userRepository = new UserRepository();

// Rutas de Usuarios
router.get('/api/users', CustomAuth, async (req: Request, res: Response) => {
  // const user = await User.find({});
  const sessionUser = req.session?.user;
  if (!sessionUser || sessionUser.role !== Role.ADMIN) {
    return res.sendStatus(401);
  }
  return res.status(200).send(await userRepository.findAllUsers());
});

// Datos del usuario de sesión
router.get('/api/account', CustomAuth, async (req: Request, res: Response) => {
  const sessionUser = req.session?.user;
  if (!sessionUser) {
    return res.sendStatus(401);
  }
  const user = await User.findOne({ accountNumber: sessionUser.accountNumber });
  return res.status(200).send(user);
});

router.post('/api/users', async (req: Request, res: Response) => {
  const { name, lastName, age, bankBalance, roleUser } = req.body;

  const user = await userRepository.create({
    name,
    lastName,
    age,
    bankBalance,
    role: roleUser === Role.ADMIN ? Role.ADMIN : Role.CLIENT,
    connections: new Array<IConn>(),
  });
  return res.status(201).send(user);
});

export { router as userRouter };
