import { PojosMetadataMap } from '@automapper/pojos';
import { UserDTO } from '../dtos/user.dto';
import { IUser } from '../entities/user.interface';

export function createUserMetadata() {
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

  PojosMetadataMap.create<UserDTO>('UserDTO', {
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
/* 
createUserMetadata();

const mapper = createMapper({ strategyInitializer: pojos() });

createMap<IUser, UserDTO>(
  mapper,
  'IUser', // this needs to match what we passed in PojosMetadataMap.create()
  'UserDTO' // this needs to match what we passed in PojosMetadataMap.create()
  // forMember(
  //       (destination) => destination.name,
  //       mapFrom((source) => source.name + ' ' + source.lastName)
  //   )
);

export const IUserToUserDTOMapper = mapper;

export function IUserToUserDtoMapper(user: IUser): UserDTO {
  return IUserToUserDTOMapper.map<IUser, UserDTO>(
    user,
    'IUser', // this needs to match what we passed in PojosMetadataMap.create()
    'UserDTO' // this needs to match what we passed in PojosMetadataMap.create()
  );
}

export function UserDtoToIUserMapper(user: UserDTO): IUser {
  return IUserToUserDTOMapper.map<UserDTO, IUser>(
    user,
    'UserDTO', // this needs to match what we passed in PojosMetadataMap.create()
    'IUser' // this needs to match what we passed in PojosMetadataMap.create()
  );
}
*/
