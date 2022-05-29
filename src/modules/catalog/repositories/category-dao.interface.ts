import { ICategory } from '../entities/category.interface';
export interface ICategoryDAO {
  get(id: number): Promise<ICategory>;
  getAll(): Promise<ICategory[]>;
  getByUUID(uuid: string): Promise<ICategory>;
  // add(user: IUser): void;
  save(category: ICategory): Promise<ICategory>;
  saveCollection(categories: ICategory[]): Promise<ICategory[]>;
  update(category: ICategory): Promise<void>;
  delete(category: ICategory): Promise<void>;
}
