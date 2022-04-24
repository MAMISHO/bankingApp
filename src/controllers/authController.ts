import 'dotenv/config';
import { Request, Response } from 'express';
import { User } from '../../models/user/user.entity';
import { Utils } from '../../utils/Utils';

const Controller = {
  signup: async (req: Request, res: Response) => {},
  login: async (req: Request, res: Response) => {
    const { uuid, password } = req.body;
    const user = await User.findOne({ uuid, password });
    if (!user) {
      return res.status(400).send({ error: true, message: 'Bad credentials' });
    }
    // Removemos información delicada: TODO usar custom Mapper
    user.password = '';
    user._id = null;
    return res.status(200).send({ token: Utils.generateToken(user) });
  },
};

// module.exports.AuthController = AuthController;
export const AuthController = Controller;
