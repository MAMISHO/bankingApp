import { createMap } from '@automapper/core';
import { injectable } from 'tsyringe';

import { MapperService } from '../../../../core/mappings/mapper.service';
import { LoadProcessDTO } from '../../dtos/load-process.dto';
import { ILoadProcess } from '../../entities/load-process.interface';
import { LoadProcessMapperService } from '../load-process-mapper-service.interface';
import { createLoadProcessMetadata } from '../meta-data/load-process.mapper';

@injectable()
export class LoadProcessMapperServiceImpl implements LoadProcessMapperService {
  constructor(private mapperService: MapperService) {
    this.initMapper();
  }

  public initMapper(): void {
    createLoadProcessMetadata();
    createMap<ILoadProcess, LoadProcessDTO>(this.mapperService.getPojosMapper(), 'ILoadProcess', 'LoadProcessDTO');
    createMap<LoadProcessDTO, ILoadProcess>(this.mapperService.getPojosMapper(), 'LoadProcessDTO', 'ILoadProcess');
  }

  public toDTO(entity: ILoadProcess): LoadProcessDTO {
    const obj = this.mapperService.getPojosMapper().map<ILoadProcess, LoadProcessDTO>(entity, 'ILoadProcess', 'LoadProcessDTO');
    return new LoadProcessDTO(obj);
  }

  public toEntity(dto: LoadProcessDTO): ILoadProcess {
    return this.mapperService.getPojosMapper().map<LoadProcessDTO, ILoadProcess>(dto, 'LoadProcessDTO', 'ILoadProcess');
  }

  public toDTOList(entityList: ILoadProcess[]): LoadProcessDTO[] {
    if (!entityList || entityList.length < 1) {
      return new Array<LoadProcessDTO>();
    }
    return entityList.map((entity) => this.toDTO(entity));
  }

  public toEntityList(dtoList: LoadProcessDTO[]): ILoadProcess[] {
    if (!dtoList || dtoList.length < 1) {
      return new Array<ILoadProcess>();
    }
    return dtoList.map((dto) => this.toEntity(dto));
  }
}
