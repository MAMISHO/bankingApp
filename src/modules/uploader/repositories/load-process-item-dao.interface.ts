import { ILoadProcessItem } from '../entities/load-process-item.interface';

export interface ILoadProcessItemDAO {
  get(id: number): Promise<ILoadProcessItem>;
  getAll(): Promise<ILoadProcessItem[]>;
  getByUUID(uuid: string): Promise<ILoadProcessItem>;
  save(item: ILoadProcessItem): Promise<ILoadProcessItem>;
  saveCollection(items: ILoadProcessItem[]): Promise<ILoadProcessItem[]>;
  update(item: ILoadProcessItem): Promise<void>;
  delete(item: ILoadProcessItem): Promise<void>;
}
