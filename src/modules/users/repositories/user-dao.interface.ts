import { UserCriteriaDTO } from '../dtos/user.dto';
import { IUser } from '../entities/user.interface';
export interface IUserDAO {
  get(id: number): Promise<IUser>;
  getAll(): Promise<IUser[]>;
  getByUUID(uuid: string): Promise<IUser>;
  getByCriteria(criteria: UserCriteriaDTO): Promise<IUser[]>;
  // add(user: IUser): void;
  save(user: IUser): Promise<IUser>;
  update(User: IUser): Promise<void>;
  delete(user: IUser): Promise<void>;
}
