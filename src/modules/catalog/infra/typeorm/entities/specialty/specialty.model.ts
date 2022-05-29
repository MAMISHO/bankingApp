import mongoose from 'mongoose';
import { ISpecialty } from '../../../../entities/specialty.interface';
import { SpecialtyDoc } from './specialty.document';

export interface SpecialtyModel extends mongoose.Model<SpecialtyDoc> {
  build(attr: ISpecialty): SpecialtyDoc;
}
