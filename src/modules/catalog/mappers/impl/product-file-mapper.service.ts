import { createMap } from '@automapper/core';
import { injectable } from 'tsyringe';
import { MapperService } from '../../../../core/mappings/mapper.service';

import { ProductFileDTO } from '../../dtos/product.dto';
import { IProduct } from '../../entities/product.interface';
import { createProductFileMetadata } from '../meta-data/product-file.mapper';
import { ProductFileMapperService } from '../product-file-mapper-service.interface';

@injectable()
export class ProductFileMapperServiceImpl implements ProductFileMapperService {
  constructor(private mapperService: MapperService) {
    this.initMapper();
  }

  public initMapper(): void {
    createProductFileMetadata();
    createMap<IProduct, ProductFileDTO>(this.mapperService.getPojosMapper(), 'IProduct', 'ProductFileDTO');
    createMap<ProductFileDTO, IProduct>(this.mapperService.getPojosMapper(), 'ProductFileDTO', 'IProduct');
  }

  public toDTO(entity: IProduct): ProductFileDTO {
    return this.mapperService.getPojosMapper().map<IProduct, ProductFileDTO>(entity, 'IProduct', 'ProductFileDTO');
  }

  public toEntity(dto: ProductFileDTO): IProduct {
    return this.mapperService.getPojosMapper().map<ProductFileDTO, IProduct>(dto, 'ProductFileDTO', 'IProduct');
  }

  public toDTOList(entityList: IProduct[]): ProductFileDTO[] {
    if (!entityList || entityList.length < 1) {
      return new Array<ProductFileDTO>();
    }
    return this.mapperService.getPojosMapper().mapArray<IProduct, ProductFileDTO>(entityList, 'IProduct', 'ProductFileDTO');
  }

  public toEntityList(dtoList: ProductFileDTO[]): IProduct[] {
    if (!dtoList || dtoList.length < 1) {
      return new Array<IProduct>();
    }
    // return dtoList.map((dto) => this.toEntity(dto));
    createProductFileMetadata();
    createMap<ProductFileDTO, IProduct>(this.mapperService.getPojosMapper(), 'ProductFileDTO', 'IProduct');
    return this.mapperService.getPojosMapper().mapArray<ProductFileDTO, IProduct>(dtoList, ' ProductFileDTO', 'IProduct');
  }
}
