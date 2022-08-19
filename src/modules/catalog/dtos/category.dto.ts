import { ICategory } from '../entities/category.interface';

export class CategoryDTO {
  public code: number;
  public name: string;
  public description: string;

  constructor(props?: ICategory) {
    Object.assign(this, props);
  }
}

export interface CategoryCriteriaDTO {
  id?: number;
  uuid?: string;
  code?: string;
  name?: string;
  status?: boolean;
}
