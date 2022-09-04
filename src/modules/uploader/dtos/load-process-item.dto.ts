import { AutoMap } from '@automapper/classes';
import { ILoadProcessItem } from '../entities/load-process-item.interface';
import { LoadProcessDTO } from './load-process.dto';

export class LoadProcessItemDTO {
  @AutoMap()
  uuid: string;
  @AutoMap()
  uuidLoadProcess: string;
  @AutoMap()
  dataItem: string;
  @AutoMap()
  loadProcess: LoadProcessDTO;

  constructor(props?: ILoadProcessItem) {
    // Object.assign(this, props);
  }
}

export interface LoadProcessItemCriteriaDTO {
  uuid?: string;
  status?: boolean;
}
