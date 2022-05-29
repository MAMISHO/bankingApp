import 'dotenv/config';
import { Request, Response } from 'express';
import { AuthService } from '../../../../../loader';
import { LoginResponseDTO } from '../../../dtos/auth.dto';

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
    try {
      const reponse: LoginResponseDTO = await AuthService.login(req);
      return res.status(200).send(reponse);
    } catch (err) {
      return res.status(400).send({ error: true, message: 'Bad credentials' });
    }
  },
};

// module.exports.AuthController = AuthController;
export const AuthController = Controller;
