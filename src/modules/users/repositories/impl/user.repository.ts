import { inject, injectable } from 'tsyringe';
import { UserCriteriaDTO } from '../../dtos/user.dto';
import { IUser } from '../../entities/user.interface';
import { IUserDAO } from '../user-dao.interface';
import { IUserRepository } from '../user-repository.interface';

@injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(@inject('IUserDAO') private userDAO: IUserDAO) {}

  async findAll(filter: UserCriteriaDTO): Promise<IUser[]> {
    return this.userDAO.getByCriteria(filter);
  }

  async get(id: number): Promise<IUser> {
    return this.userDAO.get(id);
  }

  getByUUID(uuid: string): Promise<IUser> {
    return this.userDAO.getByUUID(uuid);
  }

  async add(user: IUser): Promise<IUser> {
    return this.userDAO.save(user);
  }

  update(User: IUser): Promise<void> {
    throw new Error('Method not implemented.');
  }
  remove(user: IUser): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
