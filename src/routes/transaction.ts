import express, { Request, Response } from 'express';
import { Conn, ConnStatus } from '../../models/connection';
import { Transaction, TransactionStatus } from '../../models/transation';
import { User } from '../../models/user';
import { CustomAuth } from '../../policies/auth';

const router = express.Router();

// Rutas de Transacciones
router.get(
  '/api/transactions',
  CustomAuth,
  async (req: Request, res: Response) => {
    const user = req.session?.user;
    if (!user) {
      return res.sendStatus(401);
    }

    const transacFromMyAccount = await Transaction.find({
      accountSender: user.accountNumber,
    });
    const transacToMyAccount = await Transaction.find({
      accountReceiver: user.accountNumber,
    });

    return res
      .status(200)
      .send(transacFromMyAccount.concat(transacToMyAccount));
  }
);

router.post(
  '/api/transactions',
  CustomAuth,
  async (req: Request, res: Response) => {
    const { accountNumber, mount } = req.body;
    if (!req.session.user) {
      return res.sendStatus(401);
    }
    const user = await User.findOne({
      accountNumber: req.session.user.accountNumber,
    });
    if (!user) {
      return res.sendStatus(401);
    }

    // Verificación básica
    if (!accountNumber || !mount || mount < 0.1) {
      return res.status(400).send({ error: true, message: 'fileds required' });
    }

    // Existe la cuenta ?
    const accountUser = await User.findOne({ accountNumber: accountNumber });
    if (!accountUser) {
      return res
        .status(404)
        .send({ error: true, message: 'account not found' });
    }

    if (accountUser.accountNumber === user.accountNumber) {
      return res
        .status(409)
        .send({ error: true, message: 'accounts are the same' });
    }

    // Comprobamos si hay match entre cuentas
    // TODO: Refactor concentrar en un servicio para obtener desde conexiones
    // y desde este sitio

    const ownConn = await Conn.findOne({
      accountSender: user.accountNumber,
      accountReceiver: accountNumber,
      status: ConnStatus.APROVED,
    });
    const otherConn = await Conn.findOne({
      accountSender: accountNumber,
      accountReceiver: user.accountNumber,
      status: ConnStatus.APROVED,
    });

    if (!ownConn || !otherConn) {
      return res
        .status(409)
        .send({ error: true, message: 'accounts not matched' });
    }

    // Verificamos si la transacción es posible (verificaciones de monto)
    if (mount > user.bankBalance) {
      return res
        .status(409)
        .send({ error: true, message: 'your bankBalance is not enougth' });
    }

    // TODO: Ancapsular en una sola transacción para evitar problemas de concurrencia
    const transacction = await Transaction.build({
      accountSender: user.accountNumber!,
      accountReceiver: accountUser.accountNumber,
      mount: mount,
      date: new Date(Date.now()),
      status: TransactionStatus.SEND,
    });
    await transacction.save();

    // actualizamos el balance del usuario que ejecuta la transacción
    user.bankBalance -= mount;
    await user.save();

    // Actualizamos el balance del usuario al que se le envía la transacción
    accountUser.bankBalance += mount;
    await accountUser;

    /*
    const pipeline = [
        { $match: { status: TransactionStatus.SEND } },
        { $group: { _id: "$stars", count: { $sum: 1 } } }
    ];

    const tr = Transaction.aggregate
    */

    // await user.save();
    return res.status(201).send(transacction);
  }
);

export { router as TransactionRouter };
