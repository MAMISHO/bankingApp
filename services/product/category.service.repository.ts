import { inject, injectable } from 'tsyringe';
import { ICategory } from '../../models/products/category';
import { ICategoryDAO } from '../../repository/product/category.dao';
import { ICategoryRepository } from '../../repository/product/category.interface.repository';

@injectable()
export class CategoryServiceRepository implements ICategoryRepository {
  constructor(@inject('ICategoryDAO') private categoryDAO: ICategoryDAO) {}
  getAll(): Promise<ICategory[]> {
    return this.categoryDAO.getAll();
  }
  get(id: number): Promise<ICategory> {
    // throw new Error('Method not implemented.');
    return this.categoryDAO.get(id);
  }
  getByUUID(uuid: string): Promise<ICategory> {
    // return this.findOne(uuid);
    return this.categoryDAO.getByUUID(uuid);
  }
  add(laboratory: ICategory): Promise<ICategory> {
    // return this.create(product);
    return this.categoryDAO.save(laboratory);
  }
  addAll(laboratories: ICategory[]): Promise<ICategory[]> {
    throw new Error('Method not implemented.');
  }
  update(laboratory: ICategory): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateAll(laboratories: ICategory[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  remove(laboratory: ICategory): Promise<void> {
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
