import { createMap } from '@automapper/core';
import { injectable } from 'tsyringe';

import { MapperService } from '../../../../core/mappings/mapper.service';
import { LaboratoryDTO } from '../../dtos/laboratory.dto';
import { ILaboratory } from '../../entities/laboratory.interface';
import { LaboratoryMapperService } from '../laboratory-mapper-service.interface';
import { createCategoryMetadata } from '../meta-data/category.mapper';

@injectable()
export class LaboratoryMapperServiceImpl implements LaboratoryMapperService {
  constructor(private mapperService: MapperService) {
    this.initMapper();
  }

  public initMapper(): void {
    createCategoryMetadata();
    createMap<ILaboratory, LaboratoryDTO>(this.mapperService.getPojosMapper(), 'ILaboratory', 'LaboratoryDTO');
    createMap<LaboratoryDTO, ILaboratory>(this.mapperService.getPojosMapper(), 'LaboratoryDTO', 'ILaboratory');
  }

  public toDTO(entity: ILaboratory): LaboratoryDTO {
    const obj = this.mapperService.getPojosMapper().map<ILaboratory, LaboratoryDTO>(entity, 'ILaboratory', 'LaboratoryDTO');
    return new LaboratoryDTO(obj);
  }

  public toEntity(dto: LaboratoryDTO): ILaboratory {
    return this.mapperService.getPojosMapper().map<LaboratoryDTO, ILaboratory>(dto, 'LaboratoryDTO', 'ILaboratory');
  }

  public toDTOList(entityList: ILaboratory[]): LaboratoryDTO[] {
    if (!entityList || entityList.length < 1) {
      return new Array<LaboratoryDTO>();
    }
    return entityList.map((entity) => this.toDTO(entity));
  }

  public toEntityList(dtoList: LaboratoryDTO[]): ILaboratory[] {
    if (!dtoList || dtoList.length < 1) {
      return new Array<ILaboratory>();
    }
    return dtoList.map((dto) => this.toEntity(dto));
  }
}
