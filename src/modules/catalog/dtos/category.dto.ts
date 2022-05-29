import { ICategory } from '../entities/category.interface';

export class CategoryDTO {
  public code: number;
  public name: string;
  public description: string;

  constructor(props?: ICategory) {
    Object.assign(this, props);
  }
}
