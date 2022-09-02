import { EntityMapper } from '../../../core/mappings/entity-mapper.interface';
import { LoadProcessDTO } from '../dtos/load-process.dto';
import { ILoadProcess } from '../entities/load-process.interface';

export interface LoadProcessMapperService extends EntityMapper<ILoadProcess, LoadProcessDTO> {}
