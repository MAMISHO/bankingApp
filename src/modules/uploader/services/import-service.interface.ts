import { LoadProcessRequestDTO } from '../dtos/load-process-request.dto';
import { LoadProcessDTO } from '../dtos/load-process.dto';

/**
 * ref: https://stackoverflow.com/questions/58431076/how-to-use-async-await-with-fs-createreadstream-in-node-js
 * 
 https://www.bezkoder.com/integrate-angular-10-node-js/
 */
export interface IImportService {
  importProducts(loadRequest: LoadProcessRequestDTO): Promise<LoadProcessDTO>;
}
