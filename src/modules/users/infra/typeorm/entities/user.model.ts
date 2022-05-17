import mongoose from 'mongoose';
import { IUser } from '../../../entities/user.interface';
import { UserDoc } from './user.document';
export interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc;
}
