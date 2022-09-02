import { EntityMapper } from '../../../core/mappings/entity-mapper.interface';
import { LoadProcessItemDTO } from '../dtos/load-process-item.dto';
import { ILoadProcessItem } from '../entities/load-process-item.interface';

export interface LoadProcessItemMapperService extends EntityMapper<ILoadProcessItem, LoadProcessItemDTO> {}
