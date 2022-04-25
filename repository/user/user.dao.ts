import { IUser } from '../../models/user/user.model';
export interface IUserDAO {
  get(id: number): Promise<IUser>;
  getAll(): Promise<IUser[]>;
  getByUUID(uuid: string): Promise<IUser>;
  // add(user: IUser): void;
  save(user: IUser): Promise<void>;
  update(User: IUser): Promise<void>;
  delete(user: IUser): Promise<void>;
}
