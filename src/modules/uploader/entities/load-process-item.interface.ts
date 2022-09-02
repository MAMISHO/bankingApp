import { ILoadProcess } from './load-process.interface';

export interface ILoadProcessItem {
  // id: String;
  uuid: String;
  uuidLoadProcess: String;
  dataItem: String;
  loadProcess: ILoadProcess;
}
