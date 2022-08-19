import mongoose from 'mongoose';
import { UserRoleType } from '../../../entities/user.enum';

export interface UserDoc extends mongoose.Document {
  username: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  resetPasswordToken: string;
  role: UserRoleType;
  status: boolean;
  uuid: string;
}
