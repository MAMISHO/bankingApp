import { LoadProcessItemCriteriaDTO, LoadProcessItemDTO } from '../dtos/load-process-item.dto';

export interface ILaboratoryRepositoryService {
  /**
   * Búsqueda sin relaciones
   * @param itemId
   */
  findOne(itemId: number): Promise<LoadProcessItemDTO>;
  findOnebyCode(code: string): Promise<LoadProcessItemDTO>;
  /**
   * Búsqueda por UUID sin relaciones
   * @param uuid
   */
  findOneByUUID(uuid: string): Promise<LoadProcessItemDTO>;
  /**
   * Búsqueda con todas las relaciones
   * @param itemId
   */
  findOneComplete(itemId: number): Promise<LoadProcessItemDTO>;
  findOneByUUIDComplete(uuid: string): Promise<LoadProcessItemDTO>;

  /**
   * Lista sin relaciones
   * @param filter
   */
  findAll(filter: LoadProcessItemCriteriaDTO): Promise<LoadProcessItemDTO[]>;

  /**
   * Lista con relaciones
   * @param filter
   */
  findAllComplete(filter: LoadProcessItemCriteriaDTO): Promise<LoadProcessItemDTO[]>;

  save(loadProcessItemDTO: LoadProcessItemDTO): Promise<LoadProcessItemDTO>;
}
