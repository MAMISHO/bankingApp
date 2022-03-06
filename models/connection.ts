import mongoose from 'mongoose';

export enum ConnStatus {
  SEND = 'SEND',
  APROVED = 'APROVED',
  DISABLED = 'DISABLED',
}

export interface IConn {
  accountSender: string;
  accountReceiver: string;
  status: ConnStatus;
}

interface connModelInterface extends mongoose.Model<ConnDoc> {
  build(attr: IConn): ConnDoc;
}

export interface ConnDoc extends mongoose.Document {
  accountSender: string;
  accountReceiver: string;
  status: ConnStatus;
  // setStatus(status: ConnStatus): void;
}

export const connSchema = new mongoose.Schema({
  accountSender: {
    type: String,
    required: true,
    index: true,
  },
  accountReceiver: {
    type: String,
    required: true,
    index: true,
  },
  status: {
    type: ConnStatus,
    required: true,
  },
});

connSchema.statics.build = (attr: IConn) => {
  return new Conn(attr);
};

const Conn = mongoose.model<ConnDoc, connModelInterface>('Conn', connSchema);
const status = ConnStatus.SEND;
Conn.build({
  accountSender: '123456789',
  accountReceiver: '987654321',
  status: status,
});

export { Conn };
