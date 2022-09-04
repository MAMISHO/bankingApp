import mongoose from 'mongoose';
import { ILoadProcessItem } from '../../../../entities/load-process-item.interface';
import { LoadProcessType } from '../../../../entities/load-process-type.enum';
export interface LoadProcessDoc extends mongoose.Document {
  uuid: string;
  startDateTime: Date;
  endDateTime: Date;
  fileName: string;
  mimeType: string;
  status: boolean;
  progress: number;
  userName: string;
  loadProcessType: LoadProcessType;
  items: ILoadProcessItem[];
}
