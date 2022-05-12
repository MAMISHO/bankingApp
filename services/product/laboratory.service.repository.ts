import { inject, injectable } from 'tsyringe';
import { ILaboratory } from '../../models/products/laboratory';
import { ILaboratoryDAO } from '../../repository/product/laboratory.dao';
import { ILaboratoryRepository } from '../../repository/product/laboratory.interface.repository';

@injectable()
export class LaboratoryServiceRepository implements ILaboratoryRepository {
  constructor(@inject('ILaboratoryDAO') private laboratoryDAO: ILaboratoryDAO) {}
  getAll(): Promise<ILaboratory[]> {
    return this.laboratoryDAO.getAll();
  }
  get(id: number): Promise<ILaboratory> {
    // throw new Error('Method not implemented.');
    return this.laboratoryDAO.get(id);
  }
  getByUUID(uuid: string): Promise<ILaboratory> {
    // return this.findOne(uuid);
    return this.laboratoryDAO.getByUUID(uuid);
  }
  add(laboratory: ILaboratory): Promise<ILaboratory> {
    // return this.create(product);
    return this.laboratoryDAO.save(laboratory);
  }
  addAll(laboratories: ILaboratory[]): Promise<ILaboratory[]> {
    throw new Error('Method not implemented.');
  }
  update(laboratory: ILaboratory): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateAll(laboratories: ILaboratory[]): Promise<void> {
    throw new Error('Method not implemented.');
  }
  remove(laboratory: ILaboratory): Promise<void> {
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
