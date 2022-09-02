import { inject, injectable } from 'tsyringe';
import { ILoadProcessItem } from '../../entities/load-process-item.interface';
import { ILoadProcessItemDAO } from '../load-process-item-dao.interface';
import { ILoadProcessItemRepository } from '../load-process-item-repository.interface';

@injectable()
export class LoadProcessItemRepositoryImpl implements ILoadProcessItemRepository {
  constructor(@inject('ILoadProcessItemDAO') private loadProcessItemDAO: ILoadProcessItemDAO) {}
  getAll(): Promise<ILoadProcessItem[]> {
    return this.loadProcessItemDAO.getAll();
  }
  get(id: number): Promise<ILoadProcessItem> {
    // throw new Error('Method not implemented.');
    return this.loadProcessItemDAO.get(id);
  }
  getByUUID(uuid: string): Promise<ILoadProcessItem> {
    // return this.findOne(uuid);
    return this.loadProcessItemDAO.getByUUID(uuid);
  }
  add(item: ILoadProcessItem): Promise<ILoadProcessItem> {
    // return this.create(product);
    return this.loadProcessItemDAO.save(item);
  }
  addAll(items: ILoadProcessItem[]): Promise<ILoadProcessItem[]> {
    throw new Error('Method not implemented.');
  }
  update(items: ILoadProcessItem): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateAll(items: ILoadProcessItem[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  remove(item: ILoadProcessItem): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
