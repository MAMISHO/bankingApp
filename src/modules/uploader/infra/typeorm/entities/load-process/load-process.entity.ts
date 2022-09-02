import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ILoadProcess } from '../../../../entities/load-process.interface';
import { LoadProcessDoc } from './load-process.document';
import { LoadProcessModel } from './load-process.model';
import { LoadProcessSchema } from './load-process.schema';

LoadProcessSchema.statics.build = (attr: ILoadProcess) => {
  if (!attr.uuid) {
    attr.uuid = uuidv4();
  }
  return new LoadProcessEntity(attr);
};

const LoadProcessEntity = mongoose.model<LoadProcessDoc, LoadProcessModel>('LoadProcess', LoadProcessSchema);

export { LoadProcessEntity };
