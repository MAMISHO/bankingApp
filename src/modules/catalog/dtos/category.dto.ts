import { AutoMap } from '@automapper/classes';
import { ICategory } from '../entities/category.interface';

export class CategoryDTO {
  @AutoMap()
  public code: number;
  @AutoMap()
  public name: string;
  @AutoMap()
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
