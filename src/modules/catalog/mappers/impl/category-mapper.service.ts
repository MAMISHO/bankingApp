import { createMap } from '@automapper/core';
import { injectable } from 'tsyringe';

import { MapperService } from '../../../../core/mappings/mapper.service';
import { CategoryDTO } from '../../dtos/category.dto';
import { ICategory } from '../../entities/category.interface';
import { CategoryMapperService } from '../category-mapper-service.interface';
import { createCategoryMetadata } from '../meta-data/category.mapper';

@injectable()
export class CategoryMapperServiceImpl implements CategoryMapperService {
  constructor(private mapperService: MapperService) {
    this.initMapper();
  }

  public initMapper(): void {
    createCategoryMetadata();
    createMap<ICategory, CategoryDTO>(this.mapperService.getPojosMapper(), 'ICategory', 'CategoryDTO');
    createMap<CategoryDTO, ICategory>(this.mapperService.getPojosMapper(), 'CategoryDTO', 'ICategory');
  }

  public toDTO(entity: ICategory): CategoryDTO {
    const obj = this.mapperService.getPojosMapper().map<ICategory, CategoryDTO>(entity, 'ICategory', 'CategoryDTO');
    return new CategoryDTO(obj);
  }

  public toEntity(dto: CategoryDTO): ICategory {
    return this.mapperService.getPojosMapper().map<CategoryDTO, ICategory>(dto, 'CategoryDTO', 'ICategory');
  }

  public toDTOList(entityList: ICategory[]): CategoryDTO[] {
    if (!entityList || entityList.length < 1) {
      return new Array<CategoryDTO>();
    }
    return entityList.map((entity) => this.toDTO(entity));
  }

  public toEntityList(dtoList: CategoryDTO[]): ICategory[] {
    if (!dtoList || dtoList.length < 1) {
      return new Array<ICategory>();
    }
    return dtoList.map((dto) => this.toEntity(dto));
  }
}
