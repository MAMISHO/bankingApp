import { EntityMapper } from '../../../core/mappings/entity-mapper.interface';
import { LaboratoryDTO } from '../dtos/laboratory.dto';
import { ILaboratory } from '../entities/laboratory.interface';

export interface LaboratoryMapperService extends EntityMapper<ILaboratory, LaboratoryDTO> {}
