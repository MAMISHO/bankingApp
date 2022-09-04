import mongoose from 'mongoose';
import { ILoadProcess } from '../../../../entities/load-process.interface';
import { LoadProcessDoc } from './load-process.document';

export interface LoadProcessModel extends mongoose.Model<LoadProcessDoc> {
  build(attr: ILoadProcess): LoadProcessDoc;
  // buildCollection(attrList: ILoadProcess[]): LoadProcessDoc[];
}
