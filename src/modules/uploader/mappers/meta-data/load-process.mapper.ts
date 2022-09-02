import { PojosMetadataMap } from '@automapper/pojos';
import { LoadProcessDTO } from '../../dtos/load-process.dto';
import { ILoadProcess } from '../../entities/load-process.interface';

// https://automapperts.netlify.app/docs/strategies/pojos
export function createLoadProcessMetadata() {
  PojosMetadataMap.create<ILoadProcess>('ILoadProcess', {
    uuid: String,
    startDateTime: Date,
    endDateTime: Date,
    fileName: String,
    mimeType: String,
    status: Boolean,
    progress: Number,
    userName: String,
    loadProcessType: String,
    items: ['ILoadProcessItem'],
  });

  PojosMetadataMap.create<LoadProcessDTO>('LoadProcessDTO', {
    uuid: String,
    startDateTime: Date,
    endDateTime: Date,
    fileName: String,
    mimeType: String,
    status: Boolean,
    progress: Number,
    userName: String,
    loadProcessType: String,
    items: ['LoadProcessItemDTO'],
  });
}
