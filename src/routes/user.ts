import express from 'express';
import { CustomAuth } from '../../policies/auth';
import { UserRepository } from '../../repository/user/user.repository';
import { UserController } from '../controllers/userController';

const router = express.Router();
const userRepository = new UserRepository();

// Rutas de Usuarios
router.get('/api/users', CustomAuth, UserController.getUsers);

// Datos del usuario de sesión
/*router.get('/api/account', CustomAuth, async (req: Request, res: Response) => {
  const sessionUser = req.session?.user;
  if (!sessionUser) {
    return res.sendStatus(401);
  }
  const user = await User.findOne({ accountNumber: sessionUser.accountNumber });
  return res.status(200).send(user);
});
*/

router.post('/api/users', UserController.createUser);

export { router as userRouter };
