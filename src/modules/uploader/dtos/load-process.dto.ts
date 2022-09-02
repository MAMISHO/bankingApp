import { AutoMap } from '@automapper/classes';
import { LoadProcessType } from '../entities/load-process-type.enum';
import { ILoadProcess } from '../entities/load-process.interface';
import { LoadProcessItemDTO } from './load-process-item.dto';

export class LoadProcessDTO {
  @AutoMap()
  public uuid: String;
  @AutoMap()
  public startDateTime: Date;
  @AutoMap()
  public endDateTime: Date;
  @AutoMap()
  public fileName: String;
  @AutoMap()
  public mimeType: String;
  @AutoMap()
  public status: Boolean;
  @AutoMap()
  public progress: Number;
  @AutoMap()
  public userName: String;
  @AutoMap()
  public loadProcessType: LoadProcessType;
  @AutoMap()
  public items: LoadProcessItemDTO[];

  constructor(props?: ILoadProcess) {
    Object.assign(this, props);
  }
}

export interface LoadProcessCriteriaDTO {
  id?: number;
  uuid?: string;
  loadProcessType?: ILoadProcess;
  name?: string;
  status?: boolean;
}
