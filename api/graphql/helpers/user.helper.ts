import { UserRepositoryService } from '../../../src/loader';
import { UserDTO } from '../../../src/modules/users/dtos/user.dto';
// import { UserServiceRepository } from '../../../src/modules/users/repositories/impl/user.repository';
// import { UserServiceRepository } from '../../../repository/user/_user.service-repository';
// const userRepositoryService = container.resolve(UserServiceRepository);

export const UserHelper = {
  _getUserById: async function (id: number): Promise<UserDTO> {
    if (!id) {
      return Promise.reject(null);
    }
    // const iUser = await UserRepositoryService.get(id);
    // return Promise.resolve(new UserDTO(iUser));
    return UserRepositoryService.findOne(id);
  },

  _getUserByUUID: async function (uuid: string): Promise<UserDTO> {
    if (!uuid || uuid.length < 32) {
      return Promise.reject(null);
    }
    // const user = await userRepositoryService.getByUUID(uuid);
    // return Promise.resolve(new UserDTO(user));
    return UserRepositoryService.findOneByUUID(uuid);
  },

  _addUser: async function (data: any): Promise<UserDTO> {
    const user: UserDTO = Object.assign({}, data);
    // const iUser: IUser = { ...user };
    await UserRepositoryService.save(user);
    return user;
  },
};
