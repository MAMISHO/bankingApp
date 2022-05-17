/*import { v4 as uuid } from 'uuid';
import { IUser } from '../../src/modules/users/entities/user.interface';
import { User } from '../../src/modules/users/entities/_user.entity';
import { Utils } from '../../utils/Utils';

export class _UserRepository {
  public async findAllUsers(): Promise<IUser[]> {
    const users: IUser[] = await User.find({}).lean();
    return users;
  }

  public async findOne(uuid: string): Promise<IUser> {
    const user: IUser | null = await User.findOne({ uuid: uuid }).lean();
    if (user) {
      return Promise.resolve(user);
    } else {
      return Promise.reject(null);
    }
  }

  public async create(newUser: IUser): Promise<IUser> {
    newUser.uuid = uuid();
    newUser.password = Utils.hashPassword(newUser.password);
    const user = User.build(newUser);
    await user.save();
    const iuser: IUser = user.toJSON();
    return iuser;
  }
}*/