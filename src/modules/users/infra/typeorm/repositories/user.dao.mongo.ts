import { Utils } from '../../../../../shared/utils/Utils';
import { UserCriteriaDTO } from '../../../dtos/user.dto';
import { IUser } from '../../../entities/user.interface';
import { IUserDAO } from '../../../repositories/user-dao.interface';
import { UserEntity } from '../entities/user.entity';

// @injectable()
// @scoped(Lifecycle.ResolutionScoped)
export class UserMongoDAO implements IUserDAO {
  public async getByCriteria(criteria: UserCriteriaDTO): Promise<IUser[]> {
    if (!criteria) {
      Promise.reject(new Error('Criteria filter is required'));
    }
    if (!Utils.checkValidValue(criteria)) {
      Promise.reject(new Error('Criteria filter properties are required'));
    }
    const filter: any = {};

    if (Utils.hasValidValue(criteria.id)) {
      filter.id = criteria.id;
    }
    if (Utils.hasValidValue(criteria.status)) {
      filter.status = criteria.status;
    }
    if (Utils.hasValidValue(criteria.email)) {
      filter.email = criteria.email;
    }

    if (Utils.hasValidValue(criteria.username)) {
      filter.username = criteria.username;
    }

    if (Utils.hasValidValue(criteria.uuid)) {
      filter.uuid = criteria.uuid;
    }
    const users: IUser[] = await UserEntity.find(filter).lean();
    return users;
  }

  async get(id: number): Promise<IUser> {
    const user: IUser | null = await UserEntity.findOne({ id: id }).lean();
    if (user) {
      return Promise.resolve(user);
    } else {
      return Promise.reject(null);
    }
  }

  async getAll(): Promise<IUser[]> {
    const users: IUser[] = await UserEntity.find({}).lean();
    return users;
  }

  async getByUUID(uuid: string): Promise<IUser> {
    const user: IUser | null = await UserEntity.findOne({ uuid: uuid }).lean();
    if (user) {
      return Promise.resolve(user);
    } else {
      return Promise.reject(null);
    }
  }

  async save(newUser: IUser): Promise<IUser> {
    const user = UserEntity.build(newUser);
    const userSaved = await user.save();
    return Promise.resolve(userSaved.toJSON());
  }

  update(User: IUser): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(user: IUser): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
