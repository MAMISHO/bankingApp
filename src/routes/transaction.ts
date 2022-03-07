import express, { Request, Response } from 'express';
import { Parser } from 'json2csv';
import { Conn, ConnStatus } from '../../models/connection';
import { Transaction, TransactionStatus } from '../../models/transation';
import { Role, User } from '../../models/user';
import { CustomAuth } from '../../policies/auth';
import { TransactionRepository } from '../repositories/transaction.repository';

const router = express.Router();
const transactionRepository = new TransactionRepository();

// Rutas de Transacciones
router.get('/api/transactions', CustomAuth, async (req: Request, res: Response) => {
  const user = req.session?.user;
  if (!user) {
    return res.sendStatus(401);
  }

  return res.status(200).send(await transactionRepository.findAllByAccount(user.accountNumber!));
});

router.get('/api/transactions/export', CustomAuth, async (req: Request, res: Response) => {
  const user = req.session?.user;
  if (!user) {
    return res.sendStatus(401);
  }

  const allTransactions = await transactionRepository.findAllByAccount(user.accountNumber!);
  const fields = [
    {
      label: 'Sender',
      value: 'accountSender',
    },
    {
      label: 'Receiver',
      value: 'accountReceiver',
    },
    {
      label: 'Amount',
      value: 'mount',
    },
    {
      label: 'TimeStamp',
      value: 'date',
    },
  ];

  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(allTransactions);
  res.header('Content-Type', 'text/csv');
  res.attachment(`${user.accountNumber}_${new Date(Date.now()).toISOString()}.csv`);
  return res.send(csv);
});

/**
 * Permite ver las ganancias del banco teniendo en cuenta las reglas de las comisiones establecidas por cada trasacción.
 * 0.5% >= 1000 y 1% < 1000
 */
router.get('/api/transactions/admin', CustomAuth, async (req: Request, res: Response) => {
  const user = req.session?.user;
  if (!user || user.role !== Role.ADMIN) {
    return res.sendStatus(401);
  }

  const pipeline1 = [
    { $match: { status: TransactionStatus.SEND, mount: { $lt: 1000 } } },
    { $group: { _id: '$status', count: { $sum: '$mount' } } },
  ];
  const pipeline2 = [
    { $match: { status: TransactionStatus.SEND, mount: { $gte: 1000 } } },
    { $group: { _id: '$status', count: { $sum: '$mount' } } },
  ];

  const tr1 = await Transaction.aggregate(pipeline1);
  const tr2 = await Transaction.aggregate(pipeline2);

  let val1 = 0;
  let val2 = 0;
  if (tr1 && tr1.length === 1) {
    // Solo se filtra por SEND
    val1 = tr1[0].count ? tr1[0].count : 0;
    val1 = val1 * 0.01; // 1% para transacciones menores a 1000
  }

  if (tr2 && tr2.length === 1) {
    // Solo se filtra por SEND
    val2 = tr2[0].count ? tr2[0].count : 0;
    val2 = val2 * 0.005; // 0.5% para transacciones superiores a 999
  }

  return res.status(200).send({ earnings: val2 + val1 });
});

router.post('/api/transactions', CustomAuth, async (req: Request, res: Response) => {
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
    return res.status(404).send({ error: true, message: 'account not found' });
  }

  if (accountUser.accountNumber === user.accountNumber) {
    return res.status(409).send({ error: true, message: 'accounts are the same' });
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
    return res.status(409).send({ error: true, message: 'accounts not matched' });
  }

  // Verificamos si la transacción es posible (verificaciones de monto)
  if (mount > user.bankBalance) {
    return res.status(409).send({ error: true, message: 'your bankBalance is not enougth' });
  }

  // TODO: Encapsular en una sola transacción para evitar problemas de concurrencia
  const transacction = await Transaction.build({
    accountSender: user.accountNumber!,
    accountReceiver: accountUser.accountNumber,
    mount: mount,
    date: new Date(Date.now()),
    status: TransactionStatus.SEND,
  });
  await transacction.save();

  // actualizamos el balance del usuario que ejecuta la transacción
  // Le cobramos a quien hace la transacción
  let amount = mount < 1000 ? mount + mount * 0.01 : mount + mount * 0.005;

  user.bankBalance -= amount;
  await user.save();

  // TODO: registrar en las arcas del banco la comisión que se le cobra a quién envía

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
});

export { router as TransactionRouter };
