import { ILoadProcess } from './load-process.interface';

export interface ILoadProcessItem {
  _id?: string;
  uuid: string;
  uuidLoadProcess: string;
  dataItem: string;
  loadProcess: ILoadProcess;
}
