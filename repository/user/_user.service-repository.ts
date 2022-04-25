// declare const sails: any;
import { IUser, UserDTO, UserRequestDTO } from '../../models/user/user.model';
import { UserRepository } from './user.repository';

export class UserServiceRepositoryImpl {
  //  implements IUserRepository {
  private static _instance: UserServiceRepositoryImpl;
  private userRepository: UserRepository;
  private constructor() {
    this.userRepository = new UserRepository();
  }

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  public get(id: number): Promise<UserDTO> {
    const filter: UserRequestDTO = { id };
    return this.findOne(filter);
  }

  getByUUID(uuid: string): Promise<UserDTO> {
    return this.findOne({ uuid });
  }

  async add(user: UserDTO): Promise<UserDTO> {
    return this.saveUser(user);
    // const userDoc: UserDoc = await this.userRepository.create(user);
    // return userDoc;
  }
  /*update(user: UserDTO): Promise<UserDTO> {
    return this.updateUser(user);
  }
  remove(user: UserDTO): Promise<UserDTO> {
    return this.deleteUser(user);
  }*/

  public async findOne(filter: UserRequestDTO): Promise<UserDTO> {
    if (!filter || (!filter.id && !filter.uuid)) {
      return Promise.reject(new Error('No se ha indicado un identificador'));
    }
    /*const user: UserDTO[] = await sails.models.user.find({
      id: filter.id,
      uuid: filter.uuid,
      email: filter.email,
    });*/
    const user: IUser = await this.userRepository.findOne(filter.uuid!);
    //.populate('devices');
    if (!user) {
      return Promise.reject(new Error('No se ha indicado un identificador'));
    }
    const userDTO: UserDTO = new UserDTO(Object.assign({}, user));
    return Promise.resolve(userDTO);
  }

  public async findAll(filter: UserRequestDTO): Promise<UserDTO[]> {
    if (!filter || (filter.id && filter.uuid) || filter.email) {
      return Promise.reject(new Error('operación no permitida, no se pueden filtrar por ID'));
    }
    const finalFilter: any = {};
    const users: IUser[] = await this.userRepository.findAllUsers();
    if (users) {
      const usersDTO: UserDTO[] = new Array<UserDTO>();
      users.forEach((user) => {
        const userDTO: UserDTO = new UserDTO(Object.assign({}, user));
        usersDTO.push(userDTO);
      });
      return Promise.resolve(usersDTO);
    }
    return Promise.resolve([]);
  }

  private async saveUser(user: UserDTO): Promise<UserDTO> {
    const userDoc: IUser = await this.userRepository.create(user);
    const userSaved: UserDTO = new UserDTO(userDoc);
    return userSaved;
  }

  /*private async updateUser(user: UserDTO): Promise<UserDTO> {
    const userSaved: UserDTO = await sails.models.user.updateOne({ uuid: user.uuid }).set(user);
    return userSaved;
  }

  private async deleteUser(user: UserDTO): Promise<UserDTO> {
    const userToDelete: User = await sails.models.user.findOne({
      uuid: user.uuid,
    });
    if (!userToDelete) {
      return null;
    }
    const userSaved: UserDTO = await sails.models.user.updateOne({ uuid: userToDelete.uuid }).set({ status: true });
    return userSaved;
  }*/
}

export const UserServiceRepository = UserServiceRepositoryImpl.Instance;
