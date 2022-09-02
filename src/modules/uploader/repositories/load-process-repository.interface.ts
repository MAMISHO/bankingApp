import { LoadProcessCriteriaDTO } from '../dtos/load-process.dto';
import { ILoadProcess } from '../entities/load-process.interface';

export interface ILoadProcessRepository {
  findAll(filter: LoadProcessCriteriaDTO): Promise<ILoadProcess[]>;
  get(id: number): Promise<ILoadProcess>;
  getAll(): Promise<ILoadProcess[]>;
  getByUUID(uuid: string): Promise<ILoadProcess>;
  add(loadprocess: ILoadProcess): Promise<ILoadProcess>;
  addAll(loadprocess: ILoadProcess[]): Promise<ILoadProcess[]>;
  update(loadprocess: ILoadProcess): Promise<void>;
  updateAll(loadprocess: ILoadProcess[]): Promise<void>;
  remove(loadprocess: ILoadProcess): Promise<void>;
}
