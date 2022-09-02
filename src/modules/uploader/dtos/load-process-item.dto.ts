import { AutoMap } from '@automapper/classes';
import { ILoadProcessItem } from '../entities/load-process-item.interface';
import { LoadProcessDTO } from './load-process.dto';

export class LoadProcessItemDTO {
  @AutoMap()
  uuid: String;
  @AutoMap()
  uuidLoadProcess: String;
  @AutoMap()
  dataItem: String;
  @AutoMap()
  loadProcess: LoadProcessDTO;

  constructor(props: ILoadProcessItem) {
    Object.assign(this, props);
  }
}

export interface LoadProcessItemCriteriaDTO {
  uuid?: string;
  status?: boolean;
}
