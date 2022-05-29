import mongoose from 'mongoose';
import { ILaboratory } from '../../../entities/laboratory.interface';
import { LaboratoryDoc } from './laboratory.document';

export interface LaboratoryModel extends mongoose.Model<LaboratoryDoc> {
  build(attr: ILaboratory): LaboratoryDoc;
}
