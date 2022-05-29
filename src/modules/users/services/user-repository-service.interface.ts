import { UserCriteriaDTO, UserDTO } from '../dtos/user.dto';

export interface IUserRepositoryService {
  /**
   * Búsqueda sin relaciones
   * @param userId
   */
  findOne(userId: number): Promise<UserDTO>;
  findOnebyUsername(username: string): Promise<UserDTO>;
  /**
   * Búsqueda por UUID sin relaciones
   * @param uuid
   */
  findOneByUUID(uuid: string): Promise<UserDTO>;
  /**
   * Búsqueda con todas las relaciones
   * @param userId
   */
  findOneComplete(userId: number): Promise<UserDTO>;
  findOneByUUIDComplete(userId: string): Promise<UserDTO>;

  /**
   * Lista sin relaciones
   * @param filter
   */
  findAll(filter: UserCriteriaDTO): Promise<UserDTO[]>;

  /**
   * Lista con relaciones
   * @param filter
   */
  findAllComplete(filter: UserCriteriaDTO): Promise<UserDTO[]>;

  save(userDTO: UserDTO): Promise<UserDTO>;
}
