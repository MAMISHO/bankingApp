import { createMap } from '@automapper/core';
import { injectable } from 'tsyringe';
import { MapperService } from '../../../../core/mappings/mapper.service';

import { ProductDTO } from '../../dtos/product.dto';
import { IProduct } from '../../entities/product.interface';
import { createProductMetadata } from '../meta-data/product.mapper';
import { ProductMapperService } from '../product-mapper-service.interface';

@injectable()
export class ProductMapperServiceImpl implements ProductMapperService {
  constructor(private mapperService: MapperService) {
    this.initMapper();
  }

  public initMapper(): void {
    createProductMetadata();
    createMap<IProduct, ProductDTO>(this.mapperService.getPojosMapper(), 'IProduct', 'ProductDTO');
    createMap<ProductDTO, IProduct>(this.mapperService.getPojosMapper(), 'ProductDTO', 'IProduct');
  }

  public toDTO(entity: IProduct): ProductDTO {
    const obj = this.mapperService.getPojosMapper().map<IProduct, ProductDTO>(entity, 'IProduct', 'ProductDTO');
    return new ProductDTO(obj);
  }

  public toEntity(dto: ProductDTO): IProduct {
    return this.mapperService.getPojosMapper().map<ProductDTO, IProduct>(dto, 'ProductDTO', 'IProduct');
  }

  public toDTOList(entityList: IProduct[]): ProductDTO[] {
    if (!entityList || entityList.length < 1) {
      return new Array<ProductDTO>();
    }
    return entityList.map((entity) => this.toDTO(entity));
  }

  public toEntityList(dtoList: ProductDTO[]): IProduct[] {
    if (!dtoList || dtoList.length < 1) {
      return new Array<IProduct>();
    }
    return dtoList.map((dto) => this.toEntity(dto));
  }
}
