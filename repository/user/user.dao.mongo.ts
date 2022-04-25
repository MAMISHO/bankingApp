import { User } from '../../models/user/user.entity';
import { IUser } from '../../models/user/user.model';
import { IUserDAO } from './user.dao';

// @injectable()
// @scoped(Lifecycle.ResolutionScoped)
export class UserMongoDAO implements IUserDAO {
  async get(id: number): Promise<IUser> {
    const user: IUser | null = await User.findOne({ id: id }).lean();
    if (user) {
      return Promise.resolve(user);
    } else {
      return Promise.reject(null);
    }
  }

  async getAll(): Promise<IUser[]> {
    const users: IUser[] = await User.find({}).lean();
    return users;
  }

  async getByUUID(uuid: string): Promise<IUser> {
    const user: IUser | null = await User.findOne({ uuid: uuid }).lean();
    if (user) {
      return Promise.resolve(user);
    } else {
      return Promise.reject(null);
    }
  }

  save(user: IUser): Promise<void> {
    throw new Error('Method not implemented.');
  }

  update(User: IUser): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(user: IUser): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
