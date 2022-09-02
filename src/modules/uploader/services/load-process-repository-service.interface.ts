import { LoadProcessCriteriaDTO, LoadProcessDTO } from '../dtos/load-process.dto';

export interface ILoadProcessRepositoryService {
  /**
   * Búsqueda sin relaciones
   * @param loadProcessId
   */
  findOne(loadProcessId: number): Promise<LoadProcessDTO>;
  findOnebyCode(code: string): Promise<LoadProcessDTO>;
  /**
   * Búsqueda por UUID sin relaciones
   * @param uuid
   */
  findOneByUUID(uuid: string): Promise<LoadProcessDTO>;
  /**
   * Búsqueda con todas las relaciones
   * @param loadProcessId
   */
  findOneComplete(loadProcessId: number): Promise<LoadProcessDTO>;
  findOneByUUIDComplete(uuid: string): Promise<LoadProcessDTO>;

  /**
   * Lista sin relaciones
   * @param filter
   */
  findAll(filter: LoadProcessCriteriaDTO): Promise<LoadProcessDTO[]>;

  /**
   * Lista con relaciones
   * @param filter
   */
  findAllComplete(filter: LoadProcessCriteriaDTO): Promise<LoadProcessDTO[]>;

  save(loadProcessDTO: LoadProcessDTO): Promise<LoadProcessDTO>;
}
