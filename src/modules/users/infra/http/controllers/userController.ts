import { Request, Response } from 'express';
import { UserRepositoryService } from '../../../../../loader';
import { UserDTO, UserRequestDTO } from '../../../dtos/user.dto';
import { UserRoleType } from '../../../entities/user.enum';
import { IUser } from '../../../entities/user.interface';

const Controller = {
  getUsers: async (req: Request, res: Response) => {
    const sessionUser = req.session?.user;
    /*if (!sessionUser || sessionUser.role !== UserRoleType.ADMIN) {
      return res.sendStatus(401);
    }*/
    const request: UserRequestDTO = {};
    // return UserServiceRepository.findAll(request);

    try {
      const users: IUser[] = await UserRepositoryService.findAll(request);
      return res.status(200).send(users);
    } catch (error) {
      return res.status(400).send(error);
    }
  },

  createUser: async (req: Request, res: Response) => {
    const { name, lastname, username, roleUser, email, password, passwordConfirm } = req.body;

    const userDTO: UserDTO = new UserDTO({
      username,
      name,
      lastname,
      email,
      password,
      passwordConfirm,
      resetPasswordToken: 'HolaMundo1',
      role: UserRoleType.USER,
      status: true,
    });
    try {
      const user = await UserRepositoryService.save(userDTO);
      return res.status(201).send(user);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export const UserController = Controller;
