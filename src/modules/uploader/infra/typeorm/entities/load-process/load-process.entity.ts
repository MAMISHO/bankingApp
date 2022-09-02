import mongoose from 'mongoose';
import { ILoadProcess } from '../../../../entities/load-process.interface';
import { LoadProcessDoc } from './load-process.document';
import { LoadProcessModel } from './load-process.model';
import { LoadProcessSchema } from './load-process.schema';

LoadProcessSchema.statics.build = (attr: ILoadProcess) => {
  return new LoadProcessEntity(attr);
};

const LoadProcessEntity = mongoose.model<LoadProcessDoc, LoadProcessModel>('LoadProcess', LoadProcessSchema);

export { LoadProcessEntity };
