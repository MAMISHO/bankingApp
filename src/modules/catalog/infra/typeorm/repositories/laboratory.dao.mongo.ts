import { ILaboratory } from '../../../entities/laboratory.interface';
import { ILaboratoryDAO } from '../../../repositories/laboratory-dao.interface';
import { LaboratoryEntity } from '../entities/laboratory/laboratory.entity';

export class LaboratoryMongoDAO implements ILaboratoryDAO {
  public async get(id: number): Promise<ILaboratory> {
    const laboratory: ILaboratory | null = await LaboratoryEntity.findOne({ id: id }).lean();
    if (laboratory) {
      return Promise.resolve(laboratory);
    } else {
      return Promise.reject(null);
    }
  }

  public async getAll(): Promise<ILaboratory[]> {
    const laboratories: ILaboratory[] = await LaboratoryEntity.find({}).lean();
    return laboratories;
  }

  public async getByUUID(uuid: string): Promise<ILaboratory> {
    const laboratory: ILaboratory | null = await LaboratoryEntity.findOne({ uuid: uuid }).lean();
    if (laboratory) {
      return Promise.resolve(laboratory);
    } else {
      return Promise.reject(null);
    }
  }

  public async save(newLaboratory: ILaboratory): Promise<ILaboratory> {
    // return Product.save(product);
    const laboratory = LaboratoryEntity.build(newLaboratory);
    await laboratory.save();
    const ilaboratory: ILaboratory = laboratory.toJSON();
    return Promise.resolve(ilaboratory);
    // return iuser;
  }

  public async saveCollection(laboratories: ILaboratory[]): Promise<ILaboratory[]> {
    for (let l of laboratories) {
      l = await this.save(l); // Todo esperar a que se resuelvan todos
    }
    return Promise.resolve(laboratories);
  }

  public async update(product: ILaboratory): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async delete(product: ILaboratory): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
