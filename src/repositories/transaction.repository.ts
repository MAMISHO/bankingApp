import { Transaction, TransactionDoc } from '../../models/transation';

export class TransactionRepository {
  public async findAllByAccount(
    accountNumber: string
  ): Promise<TransactionDoc[]> {
    const transacFromMyAccount = await Transaction.find({
      accountSender: accountNumber,
    });
    const transacToMyAccount = await Transaction.find({
      accountReceiver: accountNumber,
    });
    return transacFromMyAccount.concat(transacToMyAccount);
  }
}
