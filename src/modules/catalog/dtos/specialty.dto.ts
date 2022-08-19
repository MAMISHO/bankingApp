import { ISpecialty } from '../entities/specialty.interface';

export class SpecialtyDTO {
  public code: number;
  public name: string;

  constructor(props?: ISpecialty) {
    Object.assign(this, props);
  }
}
export interface SpecialtyCriteriaDTO {
  id?: number;
  uuid?: string;
  code?: string;
  name?: string;
  status?: boolean;
}
