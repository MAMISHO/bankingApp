import mongoose from 'mongoose';
import { ILoadProcessItem } from '../../../../entities/load-process-item.interface';
import { LoadProcessItemDoc } from './load-process-item.document';

export interface LoadProcessItemModel extends mongoose.Model<LoadProcessItemDoc> {
  build(attr: ILoadProcessItem): LoadProcessItemDoc;
  build(attr: ILoadProcessItem[]): LoadProcessItemDoc[];
}
