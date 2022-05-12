import { IProduct } from '../../models/products/product';

export interface IProductRepository {
  get(id: number): Promise<IProduct>;
  getByUUID(uuid: string): Promise<IProduct>;
  add(product: IProduct): Promise<IProduct>;
  addAll(products: IProduct[]): Promise<IProduct[]>;
  update(product: IProduct): Promise<void>;
  updateAll(products: IProduct[]): Promise<void>;
  remove(product: IProduct): Promise<void>;
}
