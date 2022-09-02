import { inject, injectable } from 'tsyringe';
import { LoadProcessCriteriaDTO } from '../../dtos/load-process.dto';
import { ILoadProcess } from '../../entities/load-process.interface';
import { ILoadProcessDAO } from '../load-process-dao.interface';
import { ILoadProcessRepository } from '../load-process-repository.interface';

@injectable()
export class LoadProcessRepositoryImpl implements ILoadProcessRepository {
  constructor(@inject('ILoadProcessDAO') private loadProcessDAO: ILoadProcessDAO) {}
  findAll(filter: LoadProcessCriteriaDTO): Promise<ILoadProcess[]> {
    return this.loadProcessDAO.getAll(); // TODO: Implementar el getByCriteria y paginar
  }
  getAll(): Promise<ILoadProcess[]> {
    return this.loadProcessDAO.getAll();
  }
  get(id: number): Promise<ILoadProcess> {
    // throw new Error('Method not implemented.');
    return this.loadProcessDAO.get(id);
  }
  getByUUID(uuid: string): Promise<ILoadProcess> {
    // return this.findOne(uuid);
    return this.loadProcessDAO.getByUUID(uuid);
  }
  add(process: ILoadProcess): Promise<ILoadProcess> {
    // return this.create(product);
    return this.loadProcessDAO.save(process);
  }
  addAll(process: ILoadProcess[]): Promise<ILoadProcess[]> {
    throw new Error('Method not implemented.');
  }
  update(process: ILoadProcess): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateAll(process: ILoadProcess[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  remove(process: ILoadProcess): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
