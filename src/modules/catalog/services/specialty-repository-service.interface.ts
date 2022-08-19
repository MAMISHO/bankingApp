import { SpecialtyCriteriaDTO, SpecialtyDTO } from '../dtos/specialty.dto';

export interface ILaboratoryRepositoryService {
  /**
   * Búsqueda sin relaciones
   * @param specialtyId
   */
  findOne(specialtyId: number): Promise<SpecialtyDTO>;
  findOnebyCode(code: string): Promise<SpecialtyDTO>;
  /**
   * Búsqueda por UUID sin relaciones
   * @param uuid
   */
  findOneByUUID(uuid: string): Promise<SpecialtyDTO>;
  /**
   * Búsqueda con todas las relaciones
   * @param specialtyId
   */
  findOneComplete(specialtyId: number): Promise<SpecialtyDTO>;
  findOneByUUIDComplete(uuid: string): Promise<SpecialtyDTO>;

  /**
   * Lista sin relaciones
   * @param filter
   */
  findAll(filter: SpecialtyCriteriaDTO): Promise<SpecialtyDTO[]>;

  /**
   * Lista con relaciones
   * @param filter
   */
  findAllComplete(filter: SpecialtyCriteriaDTO): Promise<SpecialtyDTO[]>;

  save(specialtyDTO: SpecialtyDTO): Promise<SpecialtyDTO>;
}
