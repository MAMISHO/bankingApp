import { ProductCriteriaDTO, ProductDTO } from '../dtos/product.dto';

export interface IProductRepositoryService {
  /**
   * Búsqueda sin relaciones
   * @param productId
   */
  findOne(productId: number): Promise<ProductDTO>;
  findOnebyCode(code: string): Promise<ProductDTO>;
  findOnebyNationalCode(code: string): Promise<ProductDTO>;
  /**
   * Búsqueda por UUID sin relaciones
   * @param uuid
   */
  findOneByUUID(uuid: string): Promise<ProductDTO>;
  /**
   * Búsqueda con todas las relaciones
   * @param productId
   */
  findOneComplete(productId: number): Promise<ProductDTO>;
  findOneByUUIDComplete(uuid: string): Promise<ProductDTO>;

  /**
   * Lista sin relaciones
   * @param filter
   */
  findAll(filter: ProductCriteriaDTO): Promise<ProductDTO[]>;

  /**
   * Lista con relaciones
   * @param filter
   */
  findAllComplete(filter: ProductCriteriaDTO): Promise<ProductDTO[]>;

  save(productDTO: ProductDTO): Promise<ProductDTO>;
}
