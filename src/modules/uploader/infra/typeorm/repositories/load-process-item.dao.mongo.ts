import { ILoadProcessItem } from '../../../entities/load-process-item.interface';
import { ILoadProcessItemDAO } from '../../../repositories/load-process-item-dao.interface';
import { LoadProcessItemEntity } from '../entities/load-process-item/load-process-item.entity';

export class LoadProcessItemMongoDAO implements ILoadProcessItemDAO {
  public async get(id: number): Promise<ILoadProcessItem> {
    const laboratory: ILoadProcessItem | null = await LoadProcessItemEntity.findOne({ _id: id }).lean();
    if (laboratory) {
      return Promise.resolve(laboratory);
    } else {
      return Promise.reject(null);
    }
  }

  public async getAll(): Promise<ILoadProcessItem[]> {
    const laboratories: ILoadProcessItem[] = await LoadProcessItemEntity.find({}).lean();
    return laboratories;
  }

  public async getByUUID(uuid: string): Promise<ILoadProcessItem> {
    const laboratory: ILoadProcessItem | null = await LoadProcessItemEntity.findOne({ uuid: uuid }).lean();
    if (laboratory) {
      return Promise.resolve(laboratory);
    } else {
      return Promise.reject(null);
    }
  }

  public async save(newLoadProcessItem: ILoadProcessItem): Promise<ILoadProcessItem> {
    // return Product.save(product);
    const loadProcessItem = LoadProcessItemEntity.build(newLoadProcessItem);
    await loadProcessItem.save();
    const iloadProcessItem: ILoadProcessItem = loadProcessItem.toJSON();
    return Promise.resolve(iloadProcessItem);
    // return iuser;
  }

  public async saveCollection(items: ILoadProcessItem[]): Promise<ILoadProcessItem[]> {
    const processColle = LoadProcessItemEntity.build(items);
    LoadProcessItemEntity.insertMany(processColle);
    for (let l of items) {
      l = await this.save(l); // Todo esperar a que se resuelvan todos
    }
    return Promise.resolve(items);
  }

  public async update(item: ILoadProcessItem): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async delete(item: ILoadProcessItem): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
