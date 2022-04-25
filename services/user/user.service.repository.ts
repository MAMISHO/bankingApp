import { inject, injectable } from 'tsyringe';
import { IUser } from '../../models/user/user.model';
import { IUserDAO } from '../../repository/user/user.dao';
import { IUserRepository } from '../../repository/user/user.interface.repository';

@injectable()
export class UserServiceRepository implements IUserRepository {
  constructor(@inject('IUserDAO') private userDAO: IUserDAO) {}

  async get(id: number): Promise<IUser> {
    return this.userDAO.get(id);
  }
  getByUUID(uuid: string): Promise<IUser> {
    return this.userDAO.getByUUID(uuid);
  }
  add(user: IUser): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(User: IUser): Promise<void> {
    throw new Error('Method not implemented.');
  }
  remove(user: IUser): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
