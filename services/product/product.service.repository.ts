import { inject, injectable } from 'tsyringe';
import { IProduct } from '../../models/products/product';
import { IProductDAO } from '../../repository/product/product.dao';
import { IProductRepository } from '../../repository/product/product.interface.repository';

@injectable()
export class ProductServiceRepository implements IProductRepository {
  constructor(@inject('IProductDAO') private productDAO: IProductDAO) {}
  get(id: number): Promise<IProduct> {
    // throw new Error('Method not implemented.');
    return this.productDAO.get(id);
  }
  getByUUID(uuid: string): Promise<IProduct> {
    // return this.findOne(uuid);
    return this.productDAO.getByUUID(uuid);
  }
  add(product: IProduct): Promise<IProduct> {
    // return this.create(product);
    return this.productDAO.save(product);
  }
  addAll(products: IProduct[]): Promise<IProduct[]> {
    throw new Error('Method not implemented.');
  }
  update(product: IProduct): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateAll(products: IProduct[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  remove(product: IProduct): Promise<void> {
    throw new Error('Method not implemented.');
  }

  /*private async findAllUsers(): Promise<IProduct[]> {
    const products: IProduct[] = await Product.find({}).lean();
    return products;
  }

  private async findOne(uuid: string): Promise<IProduct> {
    const product: IProduct | null = await Product.findOne({ uuid: uuid }).lean();
    if (product) {
      return Promise.resolve(product);
    } else {
      return Promise.reject(null);
    }
  }

  private async create(newProduct: IProduct): Promise<IProduct> {
    // newProduct.uuid = uuid();
    // newUser.password = Utils.hashPassword(newUser.password);
    const product = Product.build(newProduct);
    await product.save();
    const iproduct: IProduct = product.toJSON();
    return iproduct;
  }*/
}
