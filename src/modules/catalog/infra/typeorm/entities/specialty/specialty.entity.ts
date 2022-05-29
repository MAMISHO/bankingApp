import mongoose from 'mongoose';
import { ISpecialty } from '../../../../entities/specialty.interface';
import { SpecialtyDoc } from './specialty.document';
import { SpecialtyModel } from './specialty.model';
import { SpecialtySchema } from './specialty.schema';

SpecialtySchema.statics.build = (attr: ISpecialty) => {
  return new SpecialtyEntity(attr);
};

const SpecialtyEntity = mongoose.model<SpecialtyDoc, SpecialtyModel>('Specialty', SpecialtySchema);

export { SpecialtyEntity };
