import { ILaboratory } from '../entities/laboratory.interface';

export interface ILaboratoryRepository {
  get(id: number): Promise<ILaboratory>;
  getAll(): Promise<ILaboratory[]>;
  getByUUID(uuid: string): Promise<ILaboratory>;
  add(laboratory: ILaboratory): Promise<ILaboratory>;
  addAll(laboratories: ILaboratory[]): Promise<ILaboratory[]>;
  update(laboratory: ILaboratory): Promise<void>;
  updateAll(laboratories: ILaboratory[]): Promise<void>;
  remove(laboratory: ILaboratory): Promise<void>;
}
