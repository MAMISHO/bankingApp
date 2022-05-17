import mongoose from 'mongoose';
import { UserRoleType } from '../../../entities/user.enum';

export const UserSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: {
    type: String,
    required: false,
  },
  role: {
    type: UserRoleType,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },

  // connections: {
  //   type: [connSchema],
  //   required: false,
  // },
  // transacctions: {
  //   type: [transactionSchema],
  //   required: false,
  // },
});
/*
UserSchema.statics.build = (attr: IUser) => {
  // attr.password = Utils.generateCustomPassword();
  return new User(attr);
};
const User = mongoose.model<UserDoc, UserModel>('User', UserSchema);
export { User };
*/
