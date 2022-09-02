import { ILoadProcess } from '../../../entities/load-process.interface';
import { ILoadProcessDAO } from '../../../repositories/load-process-dao.interface';
import { LoadProcessEntity } from '../entities/load-process/load-process.entity';

export class LoadProcessMongoDAO implements ILoadProcessDAO {
  public async get(id: number): Promise<ILoadProcess> {
    const process: ILoadProcess | null = await LoadProcessEntity.findOne({ _id: id }).lean();
    if (process) {
      return Promise.resolve(process);
    } else {
      return Promise.reject(null);
    }
  }

  public async getAll(): Promise<ILoadProcess[]> {
    const process: ILoadProcess[] = await LoadProcessEntity.find({}).lean();
    return process;
  }

  public async getByUUID(uuid: string): Promise<ILoadProcess> {
    const process: ILoadProcess | null = await LoadProcessEntity.findOne({ uuid: uuid }).lean();
    if (process) {
      return Promise.resolve(process);
    } else {
      return Promise.reject(null);
    }
  }

  public async save(newprocess: ILoadProcess): Promise<ILoadProcess> {
    // return Product.save(product);
    const process = LoadProcessEntity.build(newprocess);
    await process.save();
    const processSaved: ILoadProcess = process.toJSON();
    return Promise.resolve(processSaved);
    // return iuser;
  }

  public async saveCollection(process: ILoadProcess[]): Promise<ILoadProcess[]> {
    for (let l of process) {
      l = await this.save(l); // Todo esperar a que se resuelvan todos
    }
    return Promise.resolve(process);
  }

  public async update(process: ILoadProcess): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async delete(process: ILoadProcess): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
