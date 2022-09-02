import { ILoadProcessItem } from './load-process-item.interface';
import { LoadProcessType } from './load-process-type.enum';

export interface ILoadProcess {
  // id: String;
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
