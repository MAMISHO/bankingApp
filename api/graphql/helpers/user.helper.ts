import { UserDTO } from '../../../models/user/user.model';
import { UserServiceRepository } from '../../../repository/user/user.service-repository';

export const UserHelper = {
  _getUserById: async function (id: number): Promise<UserDTO> {
    if (!id) {
      return Promise.reject(null);
    }
    return UserServiceRepository.get(id);
  },

  _getUserByUUID: async function (uuid: string): Promise<UserDTO> {
    if (!uuid || uuid.length < 32) {
      return Promise.reject(null);
    }
    const user = await UserServiceRepository.getByUUID(uuid);
    return Promise.resolve(user);
  },

  _addUser: async function (data: any): Promise<UserDTO> {
    const user: UserDTO = Object.assign({}, data);
    return UserServiceRepository.add(user);
  },
};
