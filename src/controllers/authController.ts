import 'dotenv/config';
import { Request, Response } from 'express';
import { Utils } from '../../utils/Utils';
import { UserRepositoryService } from '../loader';

// container.register('IUserDAO', {
//   useClass: UserMongoDAO,
// });

/*container.register('IUserRepository', {
  useClass: UserServiceRepository,
});
*/
// const userRepositoryService = container.resolve(UserServiceRepository);

const Controller = {
  signup: async (req: Request, res: Response) => {},
  login: async (req: Request, res: Response) => {
    const { uuid, password } = req.body;
    // const user = await User.findOne({ uuid, password });
    // const user = await userRepositoryService.getByUUID(uuid);
    const user = await UserRepositoryService.findOneByUUID(uuid);
    if (!user) {
      return res.status(400).send({ error: true, message: 'Bad credentials' });
    }
    if (Utils.verifyPassword(password, user.password)) {
      return res.status(400).send({ error: true, message: 'Bad credentials' });
    }
    // Removemos información delicada: TODO usar custom Mapper
    user.password = '';
    // user._id = null;
    return res.status(200).send({ token: Utils.generateToken(user) });
  },
};

// module.exports.AuthController = AuthController;
export const AuthController = Controller;
