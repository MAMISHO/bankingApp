import { CategoryCriteriaDTO, CategoryDTO } from '../dtos/category.dto';

export interface ICategoryRepositoryService {
  /**
   * Búsqueda sin relaciones
   * @param categoryId
   */
  findOne(categoryId: number): Promise<CategoryDTO>;
  findOnebyCode(code: string): Promise<CategoryDTO>;
  /**
   * Búsqueda por UUID sin relaciones
   * @param uuid
   */
  findOneByUUID(uuid: string): Promise<CategoryDTO>;
  /**
   * Búsqueda con todas las relaciones
   * @param categoryId
   */
  findOneComplete(categoryId: number): Promise<CategoryDTO>;
  findOneByUUIDComplete(uuid: string): Promise<CategoryDTO>;

  /**
   * Lista sin relaciones
   * @param filter
   */
  findAll(filter: CategoryCriteriaDTO): Promise<CategoryDTO[]>;

  /**
   * Lista con relaciones
   * @param filter
   */
  findAllComplete(filter: CategoryCriteriaDTO): Promise<CategoryDTO[]>;

  save(categoryDTO: CategoryDTO): Promise<CategoryDTO>;
}
