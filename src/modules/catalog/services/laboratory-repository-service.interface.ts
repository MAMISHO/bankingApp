import { LaboratoryCriteriaDTO, LaboratoryDTO } from '../dtos/laboratory.dto';

export interface ILaboratoryRepositoryService {
  /**
   * Búsqueda sin relaciones
   * @param laboratoryId
   */
  findOne(laboratoryId: number): Promise<LaboratoryDTO>;
  findOnebyCode(code: string): Promise<LaboratoryDTO>;
  /**
   * Búsqueda por UUID sin relaciones
   * @param uuid
   */
  findOneByUUID(uuid: string): Promise<LaboratoryDTO>;
  /**
   * Búsqueda con todas las relaciones
   * @param laboratoryId
   */
  findOneComplete(laboratoryId: number): Promise<LaboratoryDTO>;
  findOneByUUIDComplete(uuid: string): Promise<LaboratoryDTO>;

  /**
   * Lista sin relaciones
   * @param filter
   */
  findAll(filter: LaboratoryCriteriaDTO): Promise<LaboratoryDTO[]>;

  /**
   * Lista con relaciones
   * @param filter
   */
  findAllComplete(filter: LaboratoryCriteriaDTO): Promise<LaboratoryDTO[]>;

  save(laboratoryDTO: LaboratoryDTO): Promise<LaboratoryDTO>;
}
