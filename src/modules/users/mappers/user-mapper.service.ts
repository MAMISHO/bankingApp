import { createMap, createMapper, Mapper } from '@automapper/core';
import { pojos } from '@automapper/pojos';
import { injectable } from 'tsyringe';

import { EntityMapper } from '../../../core/mappings/entity-mapper.interface';
import { UserDTO } from '../dtos/user.dto';
import { IUser } from '../entities/user.interface';
import { createUserMetadata } from './user.mapper';

@injectable()
export class UserMapperService implements EntityMapper<IUser, UserDTO> {
  private mapper: Mapper;

  constructor() {
    this.initMapper();
  }

  public initMapper(): void {
    createUserMetadata();
    this.mapper = createMapper({ strategyInitializer: pojos() });
    createMap<IUser, UserDTO>(this.mapper, 'IUser', 'UserDTO');
  }

  public toDTO(entity: IUser): UserDTO {
    const obj = this.mapper.map<IUser, UserDTO>(entity, 'IUser', 'UserDTO');
    return new UserDTO(obj);
  }

  public toEntity(dto: UserDTO): IUser {
    return this.mapper.map<UserDTO, IUser>(dto, 'UserDTO', 'IUser');
  }

  public toDTOList(entityList: IUser[]): UserDTO[] {
    if (!entityList || entityList.length < 1) {
      return new Array<UserDTO>();
    }
    return entityList.map((entity) => this.toDTO(entity));
  }

  public toEntityList(dtoList: UserDTO[]): IUser[] {
    if (!dtoList || dtoList.length < 1) {
      return new Array<IUser>();
    }
    return dtoList.map((dto) => this.toEntity(dto));
  }
}
