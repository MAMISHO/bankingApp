import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ILoadProcessItem } from '../../../../entities/load-process-item.interface';
import { LoadProcessItemDoc } from './load-process-item.document';
import { LoadProcessItemModel } from './load-process-item.model';
import { LoadProcessItemSchema } from './load-process-item.schema';

LoadProcessItemSchema.statics.build = (attr: ILoadProcessItem) => {
  if (!attr.uuid) {
    attr.uuid = uuidv4();
  }
  return new LoadProcessItemEntity(attr);
};

const LoadProcessItemEntity = mongoose.model<LoadProcessItemDoc, LoadProcessItemModel>('LoadProcessItem', LoadProcessItemSchema);

export { LoadProcessItemEntity };
