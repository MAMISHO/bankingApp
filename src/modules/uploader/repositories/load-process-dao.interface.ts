import { ILoadProcess } from '../entities/load-process.interface';
export interface ILoadProcessDAO {
  get(id: number): Promise<ILoadProcess>;
  getAll(): Promise<ILoadProcess[]>;
  getByUUID(uuid: string): Promise<ILoadProcess>;
  // add(user: IUser): void;
  save(loadprocess: ILoadProcess): Promise<ILoadProcess>;
  saveCollection(categories: ILoadProcess[]): Promise<ILoadProcess[]>;
  update(loadprocess: ILoadProcess): Promise<void>;
  delete(loadprocess: ILoadProcess): Promise<void>;
}
