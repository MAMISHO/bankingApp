import { AutoMap } from '@automapper/classes';
import { ILaboratory } from '../entities/laboratory.interface';

export class LaboratoryDTO {
  @AutoMap()
  public code: number;
  @AutoMap()
  public name: string;
  @AutoMap()
  public license: string;

  constructor(props: ILaboratory) {
    Object.assign(this, props);
  }
}

export interface LaboratoryCriteriaDTO {
  id?: number;
  uuid?: string;
  code?: string;
  name?: string;
  license?: string;
  status?: boolean;
}
