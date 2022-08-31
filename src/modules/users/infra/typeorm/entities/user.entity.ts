import mongoose from 'mongoose';
import { IUser } from '../../../entities/user.interface';
import { UserDoc } from './user.document';
import { UserModel } from './user.model';
import { UserSchema } from './user.schema';
import { v4 as uuidv4 } from 'uuid';
import { Utils } from '../../../../../shared/utils/Utils';

UserSchema.statics.build = (attr: IUser) => {
  if(attr.password) {
    attr.password = Utils.hashPassword(attr.password);
  }
  if(!attr.uuid) {
    attr.uuid = uuidv4();
  }
  return new UserEntity(attr);
};
const UserEntity = mongoose.model<UserDoc, UserModel>('User', UserSchema);
export { UserEntity };
