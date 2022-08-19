import { ICategory } from '../entities/category.interface';

export class LaboratoryDTO {
  public code: number;
  public name: string;
  public license: string;

  constructor(props: ICategory) {
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
