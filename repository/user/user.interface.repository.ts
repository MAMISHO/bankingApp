import { IUser } from '../../models/user/user.model';

export interface IUserRepository {
  get(id: number): Promise<IUser>;
  getByUUID(uuid: string): Promise<IUser>;
  add(user: IUser): Promise<void>;
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
