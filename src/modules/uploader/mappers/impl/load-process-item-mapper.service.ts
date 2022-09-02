import { createMap } from '@automapper/core';
import { injectable } from 'tsyringe';

import { MapperService } from '../../../../core/mappings/mapper.service';
import { LoadProcessItemDTO } from '../../dtos/load-process-item.dto';
import { ILoadProcessItem } from '../../entities/load-process-item.interface';
import { LoadProcessItemMapperService } from '../load-process-item-mapper-service.interface';
import { createLoadProcessItemMetadata } from '../meta-data/load-process-item.mapper';

@injectable()
export class LoadProcessItemMapperServiceImpl implements LoadProcessItemMapperService {
  constructor(private mapperService: MapperService) {
    this.initMapper();
  }

  public initMapper(): void {
    createLoadProcessItemMetadata();
    createMap<ILoadProcessItem, LoadProcessItemDTO>(this.mapperService.getPojosMapper(), 'ILoadProcessItem', 'LoadProcessItemDTO');
    createMap<LoadProcessItemDTO, ILoadProcessItem>(this.mapperService.getPojosMapper(), 'LoadProcessItemDTO', 'ILoadProcessItem');
  }

  public toDTO(entity: ILoadProcessItem): LoadProcessItemDTO {
    const obj = this.mapperService
      .getPojosMapper()
      .map<ILoadProcessItem, LoadProcessItemDTO>(entity, 'ILoadProcessItem', 'LoadProcessItemDTO');
    return new LoadProcessItemDTO(obj);
  }

  public toEntity(dto: LoadProcessItemDTO): ILoadProcessItem {
    return this.mapperService.getPojosMapper().map<LoadProcessItemDTO, ILoadProcessItem>(dto, 'LoadProcessItemDTO', 'ILoadProcessItem');
  }

  public toDTOList(entityList: ILoadProcessItem[]): LoadProcessItemDTO[] {
    if (!entityList || entityList.length < 1) {
      return new Array<LoadProcessItemDTO>();
    }
    return entityList.map((entity) => this.toDTO(entity));
  }

  public toEntityList(dtoList: LoadProcessItemDTO[]): ILoadProcessItem[] {
    if (!dtoList || dtoList.length < 1) {
      return new Array<ILoadProcessItem>();
    }
    return dtoList.map((dto) => this.toEntity(dto));
  }
}
