/*
import { createMap, createMapper } from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import { injectable } from 'tsyringe';
import { IUser } from '../../../entities/user.interface';
import { UserDoc } from '../entities/user.document';

export function createUserDocMetadata() {
  PojosMetadataMap.create<IUser>('IUser', {
    uuid: String,
    username: String,
    name: String,
    lastname: String,
    email: String,
    password: String,
    passwordConfirm: String,
    resetPasswordToken: String,
    role: String,
    status: Boolean,
  });
}

createUserDocMetadata();

const mapper = createMapper({ strategyInitializer: pojos() });

createMap<IUser, UserDoc>(
  mapper,
  'IUser', // this needs to match what we passed in PojosMetadataMap.create()
  UserDoc // this needs to match what we passed in PojosMetadataMap.create()
);

// export const IUserToUserDTOMapper = mapper;

@injectable()
export class UserDocMapper {
  constructor() {}

  toEntity(user: IUser): UserDoc {
    return mapper.map<IUser, UserDoc>(
      user,
      'IUser', // this needs to match what we passed in PojosMetadataMap.create()
      UserDoc // this needs to match what we passed in PojosMetadataMap.create()
    );
  }
  toInterface(user: UserDoc): IUser {
    return mapper.map<UserDoc, IUser>(
      user,
      UserDoc, // this needs to match what we passed in PojosMetadataMap.create()
      'IUser' // this needs to match what we passed in PojosMetadataMap.create()
    );
  }
}
*/
