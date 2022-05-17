import mongoose from 'mongoose';
import { IUser } from '../../../entities/user.interface';
import { UserDoc } from './user.document';
import { UserModel } from './user.model';
import { UserSchema } from './user.schema';

UserSchema.statics.build = (attr: IUser) => {
  // attr.password = Utils.generateCustomPassword();
  return new UserEntity(attr);
};
const UserEntity = mongoose.model<UserDoc, UserModel>('User', UserSchema);
export { UserEntity };
