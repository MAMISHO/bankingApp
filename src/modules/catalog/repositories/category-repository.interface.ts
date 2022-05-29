import { ICategory } from '../entities/category.interface';

export interface ICategoryRepository {
  get(id: number): Promise<ICategory>;
  getAll(): Promise<ICategory[]>;
  getByUUID(uuid: string): Promise<ICategory>;
  add(category: ICategory): Promise<ICategory>;
  addAll(categories: ICategory[]): Promise<ICategory[]>;
  update(category: ICategory): Promise<void>;
  updateAll(categories: ICategory[]): Promise<void>;
  remove(category: ICategory): Promise<void>;
}
