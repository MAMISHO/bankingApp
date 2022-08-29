import { EntityMapper } from '../../../core/mappings/entity-mapper.interface';
import { CategoryDTO } from '../dtos/category.dto';
import { ICategory } from '../entities/category.interface';

export interface CategoryMapperService extends EntityMapper<ICategory, CategoryDTO> {}
