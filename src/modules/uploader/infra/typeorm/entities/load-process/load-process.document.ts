import mongoose from 'mongoose';
import { ILoadProcessItem } from '../../../../entities/load-process-item.interface';
import { LoadProcessType } from '../../../../entities/load-process-type.enum';
export interface LoadProcessDoc extends mongoose.Document {
  uuid: String;
  startDateTime: Date;
  endDateTime: Date;
  fileName: String;
  mimeType: String;
  status: Boolean;
  progress: Number;
  userName: String;
  loadProcessType: LoadProcessType;
  items: ILoadProcessItem[];
}
