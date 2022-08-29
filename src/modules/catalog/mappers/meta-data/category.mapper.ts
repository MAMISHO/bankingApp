import { PojosMetadataMap } from '@automapper/pojos';
import { CategoryDTO } from '../../dtos/category.dto';
import { ICategory } from '../../entities/category.interface';

// https://automapperts.netlify.app/docs/strategies/pojos
export function createCategoryMetadata() {
  PojosMetadataMap.create<ICategory>('ICategory', {
    code: Number,
    name: String,
    description: String,
  });

  PojosMetadataMap.create<CategoryDTO>('CategoryDTO', {
    code: Number,
    name: String,
    description: String,
  });
}
