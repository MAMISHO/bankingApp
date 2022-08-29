import { PojosMetadataMap } from '@automapper/pojos';
import { LaboratoryDTO } from '../../dtos/laboratory.dto';
import { ILaboratory } from '../../entities/laboratory.interface';

// https://automapperts.netlify.app/docs/strategies/pojos
export function createLaboratoryMetadata() {
  PojosMetadataMap.create<ILaboratory>('ILaboratory', {
    code: Number,
    name: String,
    license: String,
  });

  PojosMetadataMap.create<LaboratoryDTO>('LaboratoryDTO', {
    code: Number,
    name: String,
    license: String,
  });
}
