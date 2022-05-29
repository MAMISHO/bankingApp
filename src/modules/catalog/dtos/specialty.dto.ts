import { ISpecialty } from '../entities/specialty.interface';

export class SpecialtyDTO {
  public code: number;
  public name: string;

  constructor(props?: ISpecialty) {
    Object.assign(this, props);
  }
}
