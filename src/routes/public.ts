import 'dotenv/config';
import express, { Request, Response } from 'express';
import { User } from '../../models/user';
import { Utils } from '../../utils/Utils';

const router = express.Router();

router.post('/api/login', async (req: Request, res: Response) => {
  const { accountNumber, password } = req.body;
  const user = await User.findOne({ accountNumber, password });
  if (!user) {
    return res.status(400).send({ error: true, message: 'Bad credentials' });
  }
  // Removemos información delicada: TODO usar custom Mapper
  user.password = '';
  user._id = null;
  return res.status(200).send({ token: Utils.generateToken(user) });
});

export { router as publicRouter };
