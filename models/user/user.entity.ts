import mongoose from 'mongoose';

export enum UserRoleType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface IUser {
  name: string;
  surname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  resetPasswordToken: string;
  role: UserRoleType;
  status: boolean;
  uuid: string;
}

interface userModelInterface extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc;
}

export interface UserDoc extends mongoose.Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  resetPasswordToken: string;
  role: UserRoleType;
  status: boolean;
  uuid: string;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetPasswordToken: {
    type: String,
    required: true,
  },
  role: {
    type: UserRoleType,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  uuid: {
    type: String,
    required: true,
    index: true,
  },
  /*
  connections: {
    type: [connSchema],
    required: false,
  },
  transacctions: {
    type: [transactionSchema],
    required: false,
  },*/
});

userSchema.statics.build = (attr: IUser) => {
  // attr.password = Utils.generateCustomPassword();
  return new User(attr);
};

const User = mongoose.model<UserDoc, userModelInterface>('User', userSchema);
// const role = UserRoleType.CLIENT;
// const connections = new Array<IConn>();
/*User.build({
  name: 'Edwin',
  su: 'Quishpe',
  age: 30,
  bankBalance: 100,
  role,
  // connections,
});*/

export { User };
