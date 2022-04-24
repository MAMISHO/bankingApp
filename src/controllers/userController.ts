import { Request, Response } from 'express';
import { UserDTO, UserRequestDTO, UserRoleType } from '../../models/user/user.model';
import { UserServiceRepository } from '../../repository/user/user.service-repository';

const Controller = {
  getUsers: async (req: Request, res: Response) => {
    const sessionUser = req.session?.user;
    if (!sessionUser || sessionUser.role !== UserRoleType.ADMIN) {
      return res.sendStatus(401);
    }
    const request: UserRequestDTO = {};
    return UserServiceRepository.findAll(request);

    // return UserServiceRepository.get(req.param.userId);
  },

  createUser: async (req: Request, res: Response) => {
    const { name, lastName, age, bankBalance, roleUser, email, password, passwordConfirm } = req.body;

    const userDTO: UserDTO = new UserDTO({
      name: name,
      surname: lastName,
      email,
      password,
      passwordConfirm,
      resetPasswordToken: 'HolaMundo1',
      role: UserRoleType.USER,
      status: true,
      uuid: 'cc5bab9b-5685-4795-8721-e2cd7dabe2bd',
    });
    try {
      const user = await UserServiceRepository.add(userDTO);
      return res.status(201).send(user);
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export const UserController = Controller;
