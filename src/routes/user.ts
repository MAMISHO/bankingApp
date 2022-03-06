import express, { Request, Response } from 'express';
import { IConn } from '../../models/connection';
import { Role, User } from '../../models/user';
import { CustomAuth } from '../../policies/auth';

const router = express.Router();

// Rutas de Usuarios
router.get('/api/users', CustomAuth, async (req: Request, res: Response) => {
  const todo = await User.find({});
  return res.status(200).send(todo);
});

router.post('/api/users', async (req: Request, res: Response) => {
  const { name, lastName, age, bankBalance } = req.body;
  const role = Role.CLIENT;
  const connections = new Array<IConn>();
  const user = User.build({
    name,
    lastName,
    age,
    bankBalance,
    role,
    connections,
  });
  await user.save();
  return res.status(201).send(user);
});

export { router as userRouter };
