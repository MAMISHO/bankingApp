import mongoose from 'mongoose';
import { ILoadProcess } from '../../../../entities/load-process.interface';

export interface LoadProcessItemDoc extends mongoose.Document {
  uuid: String;
  uuidLoadProcess: String;
  dataItem: String;
  loadProcess: ILoadProcess;
}
