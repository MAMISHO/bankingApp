import mongoose from 'mongoose';

export enum TransactionStatus {
  SEND = 'SEND',
  COMMIT = 'COMMIT',
  REWIND = 'REWIND',
}

export interface ITransaction {
  accountSender: string;
  accountReceiver: string;
  mount: number;
  date: Date;
  status: TransactionStatus;
}

interface transacctionModelInterface extends mongoose.Model<TransactionDoc> {
  build(attr: ITransaction): TransactionDoc;
}

export interface TransactionDoc extends mongoose.Document {
  accountSender: string;
  accountReceiver: string;
  mount: number;
  date: Date;
  status: TransactionStatus;
}

export const transactionSchema = new mongoose.Schema({
  accountSender: {
    type: String,
    required: true,
  },
  accountReceiver: {
    type: String,
    required: true,
  },
  mount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: TransactionStatus,
    required: true,
  },
});

transactionSchema.statics.build = (attr: ITransaction) => {
  return new Transaction(attr);
};

const Transaction = mongoose.model<TransactionDoc, transacctionModelInterface>(
  'Transacction',
  transactionSchema
);
const status = TransactionStatus.SEND;
Transaction.build({
  accountSender: '123456789',
  accountReceiver: '987654321',
  mount: 200,
  date: new Date(Date.now()),
  status: status,
});

export { Transaction };
