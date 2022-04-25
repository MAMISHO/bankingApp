import { container } from 'tsyringe';
import { IUser, UserDTO } from '../../../models/user/user.model';
import { UserServiceRepository } from '../../../services/user/user.service.repository';
// import { UserServiceRepository } from '../../../repository/user/_user.service-repository';
const userRepositoryService = container.resolve(UserServiceRepository);

export const UserHelper = {
  _getUserById: async function (id: number): Promise<UserDTO> {
    if (!id) {
      return Promise.reject(null);
    }
    const iUser = await userRepositoryService.get(id);
    return Promise.resolve(new UserDTO(iUser));
  },

  _getUserByUUID: async function (uuid: string): Promise<UserDTO> {
    if (!uuid || uuid.length < 32) {
      return Promise.reject(null);
    }
    const user = await userRepositoryService.getByUUID(uuid);
    return Promise.resolve(new UserDTO(user));
  },

  _addUser: async function (data: any): Promise<UserDTO> {
    const user: UserDTO = Object.assign({}, data);
    const iUser: IUser = { ...user };
    await userRepositoryService.add(iUser);
    return user;
  },
};
