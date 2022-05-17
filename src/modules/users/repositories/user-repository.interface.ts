import { UserCriteriaDTO } from '../dtos/user.dto';
import { IUser } from '../entities/user.interface';

export interface IUserRepository {
  get(id: number): Promise<IUser>;
  findAll(filter: UserCriteriaDTO): Promise<IUser[]>;
  getByUUID(uuid: string): Promise<IUser>;
  add(user: IUser): Promise<IUser>;
  update(User: IUser): Promise<void>;
  remove(user: IUser): Promise<void>;
}

/*export class Repository {
  private static _instance: Repository;

  // private constructor() {}

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }
}*/
