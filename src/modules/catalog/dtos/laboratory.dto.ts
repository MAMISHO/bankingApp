import { ICategory } from '../entities/category.interface';

export class LaboratoryDTO {
  public code: number;
  public name: string;
  public license: string;

  constructor(props: ICategory) {
    Object.assign(this, props);
  }
}
