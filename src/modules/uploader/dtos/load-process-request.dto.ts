import { AutoMap } from '@automapper/classes';
import { LoadProcessType } from '../entities/load-process-type.enum';

export class LoadProcessRequestDTO {
  @AutoMap()
  public file: Express.Multer.File;
  @AutoMap()
  public fileName: string;
  @AutoMap()
  public uploadType: LoadProcessType;

  constructor(req: { file: Express.Multer.File; fileName: string; uploadType: LoadProcessType }) {
    this.file = req.file;
    this.fileName = req.fileName;
    this.uploadType = req.uploadType;
  }
}
