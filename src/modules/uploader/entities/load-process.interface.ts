import { ILoadProcessItem } from './load-process-item.interface';
import { LoadProcessType } from './load-process-type.enum';

export interface ILoadProcess {
  // id: string;
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
