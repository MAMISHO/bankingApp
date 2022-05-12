import { ILaboratory } from '../../models/products/laboratory';

export interface ILaboratoryDAO {
  get(id: number): Promise<ILaboratory>;
  getAll(): Promise<ILaboratory[]>;
  getByUUID(uuid: string): Promise<ILaboratory>;
  // add(user: IUser): void;
  save(product: ILaboratory): Promise<ILaboratory>;
  saveCollection(products: ILaboratory[]): Promise<ILaboratory[]>;
  update(product: ILaboratory): Promise<void>;
  delete(product: ILaboratory): Promise<void>;
}
