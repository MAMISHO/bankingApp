import mongoose from 'mongoose';
import { ILaboratory } from '../../../../entities/laboratory.interface';
import { LaboratoryDoc } from './laboratory.document';
import { LaboratoryModel } from './laboratory.model';
import { LaboratorySchema } from './laboratory.schema';

LaboratorySchema.statics.build = (attr: ILaboratory) => {
  return new LaboratoryEntity(attr);
};

const LaboratoryEntity = mongoose.model<LaboratoryDoc, LaboratoryModel>('Laboratory', LaboratorySchema);

export { LaboratoryEntity };
