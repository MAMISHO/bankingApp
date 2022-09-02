import { PojosMetadataMap } from '@automapper/pojos';
import { LoadProcessItemDTO } from '../../dtos/load-process-item.dto';
import { ILoadProcessItem } from '../../entities/load-process-item.interface';

// https://automapperts.netlify.app/docs/strategies/pojos
export function createLoadProcessItemMetadata() {
  PojosMetadataMap.create<ILoadProcessItem>('ILoadProcessItem', {
    uuid: String,
    uuidLoadProcess: String,
    dataItem: String,
    loadProcess: ['ILoadProcess'],
  });

  PojosMetadataMap.create<LoadProcessItemDTO>('LoadProcessItemDTO', {
    uuid: String,
    uuidLoadProcess: String,
    dataItem: String,
    loadProcess: ['LoadProcessDTO'],
  });
}
