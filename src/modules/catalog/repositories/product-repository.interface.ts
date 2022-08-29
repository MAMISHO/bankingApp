import { ProductCriteriaDTO } from '../dtos/product.dto';
import { IProduct } from '../entities/product.interface';

export interface IProductRepository {
  findAll(filter: ProductCriteriaDTO): Promise<IProduct[]>;
  get(id: number): Promise<IProduct>;
  getByUUID(uuid: string): Promise<IProduct>;
  add(product: IProduct): Promise<IProduct>;
  addAll(products: IProduct[]): Promise<IProduct[]>;
  update(product: IProduct): Promise<void>;
  updateAll(products: IProduct[]): Promise<void>;
  remove(product: IProduct): Promise<void>;
}
