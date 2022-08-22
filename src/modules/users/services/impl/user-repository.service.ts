import { inject, injectable } from 'tsyringe';
import { UserCriteriaDTO, UserDTO } from '../../dtos/user.dto';
import { IUser } from '../../entities/user.interface';
import { UserMapperService } from '../../mappers/user-mapper.service';
// import { IUserToUserDtoMapper, UserDtoToIUserMapper } from '../../mappers/user.mapper';
import { IUserRepository } from '../../repositories/user-repository.interface';
import { IUserRepositoryService } from '../user-repository-service.interface';

// Este servicio solo trabaja con DTOS y es el servicio de alto nivel
@injectable()
export class UserRepositoryServiceImpl implements IUserRepositoryService {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository,
    private userMapperService: UserMapperService
  ) {}

  public async findOnebyUsername(username: string): Promise<UserDTO> {
    const filter: UserCriteriaDTO = { username };
    const result = await this.findAll(filter);

    if (result.length > 1) {
      throw new Error('username should be  unique');
    }

    if (result.length === 1) {
      return Promise.resolve(result.pop());
    }

    return Promise.reject();
  }

  public async findOne(userId: number): Promise<UserDTO> {
    let userDTO: UserDTO;
    const user: IUser = await this.userRepository.get(userId);
    if (user) {
      userDTO = this.userMapperService.toDTO(user);
      return Promise.resolve(userDTO);
    }
    return Promise.reject(new Error('User not found'));
  }

  public async findOneByUUID(uuid: string): Promise<UserDTO> {
    let userDTO: UserDTO;
    const user: IUser = await this.userRepository.getByUUID(uuid);
    if (user) {
      userDTO = this.userMapperService.toDTO(user);
      return Promise.resolve(userDTO);
    }
    return Promise.reject(new Error('User not found'));
  }

  public async findOneComplete(userId: number): Promise<UserDTO> {
    throw new Error('Method not implemented.');
  }

  public async findOneByUUIDComplete(userId: string): Promise<UserDTO> {
    throw new Error('Method not implemented.');
  }

  public async findAll(filter: UserCriteriaDTO): Promise<UserDTO[]> {
    let userDTOs: UserDTO[] = new Array<UserDTO>();
    const users: IUser[] = await this.userRepository.findAll(filter);
    if (users && users.length > 0) {
      userDTOs = this.userMapperService.toDTOList(users);
    }
    return Promise.resolve(userDTOs);
  }

  public async findAllComplete(filter: UserCriteriaDTO): Promise<UserDTO[]> {
    throw new Error('Method not implemented.');
  }

  public async save(userDTO: UserDTO): Promise<UserDTO> {
    const user: IUser = this.userMapperService.toEntity(userDTO);
    const newUser: IUser = await this.userRepository.add(user);
    if (newUser) {
      const userDTO: UserDTO = this.userMapperService.toDTO(newUser);
      return Promise.resolve(userDTO);
    }
    return Promise.reject(new Error('Fail to to save user'));
  }
}
