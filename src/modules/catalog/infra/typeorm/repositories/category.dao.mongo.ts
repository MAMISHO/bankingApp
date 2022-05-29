import { ICategory } from '../../../entities/category.interface';
import { ICategoryDAO } from '../../../repositories/category-dao.interface';
import { CategoryEntity } from '../entities/category/category.entity';

export class CategoryMongoDAO implements ICategoryDAO {
  public async get(id: number): Promise<ICategory> {
    const category: ICategory | null = await CategoryEntity.findOne({ id: id }).lean();
    if (category) {
      return Promise.resolve(category);
    } else {
      return Promise.reject(null);
    }
  }

  public async getAll(): Promise<ICategory[]> {
    const laboratories: ICategory[] = await CategoryEntity.find({}).lean();
    return laboratories;
  }

  public async getByUUID(uuid: string): Promise<ICategory> {
    const category: ICategory | null = await CategoryEntity.findOne({ uuid: uuid }).lean();
    if (category) {
      return Promise.resolve(category);
    } else {
      return Promise.reject(null);
    }
  }

  public async save(newCategory: ICategory): Promise<ICategory> {
    // return Product.save(product);
    const category = CategoryEntity.build(newCategory);
    await category.save();
    const icategory: ICategory = category.toJSON();
    return Promise.resolve(icategory);
    // return iuser;
  }

  public async saveCollection(categories: ICategory[]): Promise<ICategory[]> {
    for (let l of categories) {
      l = await this.save(l); // Todo esperar a que se resuelvan todos
    }
    return Promise.resolve(categories);
  }

  public async update(category: ICategory): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async delete(category: ICategory): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
