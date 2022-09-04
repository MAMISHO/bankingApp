import mongoose from 'mongoose';
import { ILoadProcess } from '../../../../entities/load-process.interface';

export interface LoadProcessItemDoc extends mongoose.Document {
  uuid: string;
  uuidLoadProcess: string;
  dataItem: string;
  loadProcess: ILoadProcess;
}
