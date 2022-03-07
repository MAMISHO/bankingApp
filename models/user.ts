import mongoose from 'mongoose';
import { Utils } from '../utils/Utils';
import { connSchema, IConn } from './connection';
import { ITransaction, transactionSchema } from './transation';

export enum Role {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

export interface IUser {
  name: string;
  lastName: string;
  age: number;
  bankBalance: number;
  role: Role;
  accountNumber?: string;
  password?: string;
  connections?: IConn[];
  transacctions?: ITransaction[];
}

export interface IBasicUser {
  name: string;
  age: number;
  accountNumber: string;
}

interface userModelInterface extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc;
}

export interface UserDoc extends mongoose.Document {
  name: string;
  lastName: string;
  age: number;
  bankBalance: number;
  role: Role;
  accountNumber: string;
  password: string;
  connections?: IConn[];
  transacctions?: ITransaction[];
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  bankBalance: {
    type: Number,
    required: true,
  },
  role: {
    type: Role,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  connections: {
    type: [connSchema],
    required: false,
  },
  transacctions: {
    type: [transactionSchema],
    required: false,
  },
});

userSchema.statics.build = (attr: IUser) => {
  attr.accountNumber = Math.floor(Math.random() * 10000000000) + '';
  attr.password = Utils.generateCustomPassword();
  return new User(attr);
};

const User = mongoose.model<UserDoc, userModelInterface>('User', userSchema);
const role = Role.CLIENT;
// const connections = new Array<IConn>();
User.build({
  name: 'Edwin',
  lastName: 'Quishpe',
  age: 30,
  bankBalance: 100,
  role,
  // connections,
});

export { User };
