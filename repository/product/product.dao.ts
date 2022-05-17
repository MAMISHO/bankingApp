import { IProduct } from '../../models/products/product';

export interface IProductDAO {
  get(id: number): Promise<IProduct>;
  getAll(): Promise<IProduct[]>;
  getByUUID(uuid: string): Promise<IProduct>;
  // add(user: IUser): void;
  save(product: IProduct): Promise<IProduct>;
  saveCollection(products: IProduct[]): Promise<IProduct[]>;
  update(product: IProduct): Promise<void>;
  delete(product: IProduct): Promise<void>;
}