import { AutoMap } from '@automapper/classes';
import mongoose from 'mongoose';
import { UserRoleType } from '../../../entities/user.enum';

/*
export interface UserDoc extends mongoose.Document {
  username: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  resetPasswordToken: string;
  role: UserRoleType;
  status: boolean;
  uuid: string;
} */

export class UserDoc extends mongoose.Document {
  @AutoMap()
  username: string;
  @AutoMap()
  name: string;
  @AutoMap()
  lastname: string;
  @AutoMap()
  email: string;
  @AutoMap()
  password: string;
  @AutoMap()
  resetPasswordToken: string;
  @AutoMap()
  role: UserRoleType;
  @AutoMap()
  status: boolean;
  @AutoMap()
  uuid: string;
}
