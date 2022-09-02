import mongoose from 'mongoose';
import { ILoadProcessItem } from '../../../../entities/load-process-item.interface';
import { LoadProcessItemDoc } from './load-process-item.document';
import { LoadProcessItemModel } from './load-process-item.model';
import { LoadProcessItemSchema } from './load-process-item.schema';

LoadProcessItemSchema.statics.build = (attr: ILoadProcessItem) => {
  return new LoadProcessItemEntity(attr);
};

const LoadProcessItemEntity = mongoose.model<LoadProcessItemDoc, LoadProcessItemModel>('LoadProcessItem', LoadProcessItemSchema);

export { LoadProcessItemEntity };
