import { IProduct } from '../../../entities/product.interface';
import { IProductDAO } from '../../../repositories/product-dao.interface';
import { ProductEntity } from '../entities/product/product.entity';

// @injectable()
// @scoped(Lifecycle.ResolutionScoped)
export class ProductMongoDAO implements IProductDAO {
  public async get(id: number): Promise<IProduct> {
    const product: IProduct | null = await ProductEntity.findOne({ id: id }).lean();
    if (product) {
      return Promise.resolve(product);
    } else {
      return Promise.reject(null);
    }
  }

  public async getAll(): Promise<IProduct[]> {
    const products: IProduct[] = await ProductEntity.find({}).lean();
    return products;
  }

  public async getByUUID(uuid: string): Promise<IProduct> {
    const product: IProduct | null = await ProductEntity.findOne({ uuid: uuid }).lean();
    if (product) {
      return Promise.resolve(product);
    } else {
      return Promise.reject(null);
    }
  }

  public async save(newProduct: IProduct): Promise<IProduct> {
    // return Product.save(product);
    const product = ProductEntity.build(newProduct);
    await product.save();
    const iuser: IProduct = product.toJSON() as IProduct;
    return Promise.resolve(iuser);
    // return iuser;
  }

  public async saveCollection(products: IProduct[]): Promise<IProduct[]> {
    for (let product of products) {
      product = await this.save(product); // Todo esperar a que se resuelvan todos
    }
    return Promise.resolve(products);
  }

  public async update(product: IProduct): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async delete(product: IProduct): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
