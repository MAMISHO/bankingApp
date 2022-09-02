import { ILoadProcessItem } from '../entities/load-process-item.interface';

export interface ILoadProcessItemRepository {
  get(id: number): Promise<ILoadProcessItem>;
  getAll(): Promise<ILoadProcessItem[]>;
  getByUUID(uuid: string): Promise<ILoadProcessItem>;
  add(item: ILoadProcessItem): Promise<ILoadProcessItem>;
  addAll(items: ILoadProcessItem[]): Promise<ILoadProcessItem[]>;
  update(item: ILoadProcessItem): Promise<void>;
  updateAll(items: ILoadProcessItem[]): Promise<void>;
  remove(item: ILoadProcessItem): Promise<void>;
}
