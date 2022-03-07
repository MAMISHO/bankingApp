import express, { Request, Response } from 'express';
import { Conn, ConnDoc, ConnStatus } from '../../models/connection';
import { IBasicUser, User } from '../../models/user';
import { CustomAuth } from '../../policies/auth';

const router = express.Router();

/**
 * Todas las conexiones del cliente de sesión (Las que ha enviado y las que ha aceptado)
 */
router.get('/api/connections', CustomAuth, async (req: Request, res: Response) => {
  const user = req.session?.user;
  if (!user) {
    return res.sendStatus(401);
  }

  const ownConn = await Conn.find({ accountSender: user.accountNumber });
  const reqConnAproved = await Conn.find({
    accountReceiver: user.accountNumber,
    status: ConnStatus.APROVED,
  });
  const connections = ownConn.concat(reqConnAproved);
  return res.status(200).send(connections);
});

/**
 * Obtienen los datos básicos de los usuarios conectados al usuario de la sesión
 */
router.get('/api/connections/detail', CustomAuth, async (req: Request, res: Response) => {
  const user = req.session?.user;
  if (!user) {
    return res.sendStatus(401);
  }

  const ownConn = await Conn.find({ accountSender: user.accountNumber });
  const reqConnAproved = await Conn.find({
    accountReceiver: user.accountNumber,
    status: ConnStatus.APROVED,
  });
  const connections = ownConn.concat(reqConnAproved);
  const accounts: Set<string> = new Set<string>();
  // Unificamos todas las conexiones enviadas y recibidas con estado aprobadas
  for (const conn of connections) {
    accounts.add(conn.accountSender);
    accounts.add(conn.accountReceiver);
  }
  accounts.delete(user.accountNumber!); // eliminamos la del usuario que ejecuta la consulta
  const usersDetail = await User.find({
    accountNumber: { $in: Array.from(accounts.values()) },
  });
  if (!usersDetail || usersDetail.length === 0) {
    return res.status(200).send([]);
  }
  const basicUsers = usersDetail.map((usr) => {
    const basic: IBasicUser = {
      name: usr.name,
      age: usr.age,
      accountNumber: usr.accountNumber,
    };
    return basic;
  });
  return res.status(200).send(basicUsers);
});

/**
 * Obtiene las peticiones de conexión que han enviado otros usuarios al usuario de la sesión
 */
router.get('/api/connections/request', CustomAuth, async (req: Request, res: Response) => {
  const user = req.session?.user;
  if (!user) {
    return res.sendStatus(401);
  }

  const connections = await Conn.find({
    accountReceiver: user.accountNumber,
    status: ConnStatus.SEND,
  });
  return res.status(200).send(connections);
});

/**
 * Envía una solicitud de conexión a un usuario.
 * Requiere indicar el número de cuenta del usuario al que se quiere enviar la petición de conexión.
 */
router.post('/api/connections', CustomAuth, async (req: Request, res: Response) => {
  const { accountNumber } = req.body;
  const user = req.session?.user;
  if (!user) {
    return res.sendStatus(401);
  }
  // Verificamos que la cuenta a la que se envía existe
  const userAccount = await User.findOne({ accountNumber: accountNumber });
  if (!userAccount) {
    return res.status(404).send({ error: true, message: 'account not found' });
  }
  if (userAccount.accountNumber === user.accountNumber) {
    return res.status(409).send({ error: true, message: 'operation not allowed' });
  }
  // Verificamos que no haya alguna
  const connections = await Conn.find({
    accountSender: user.accountNumber,
    accountReceiver: accountNumber,
  });
  if (connections.length > 0) {
    return res.status(409).send({ error: true, message: 'connection already exist' });
  }

  const status = ConnStatus.SEND;
  const newConn = Conn.build({
    accountSender: user.accountNumber!,
    accountReceiver: accountNumber,
    status: status,
  });
  await newConn.save();
  return res.status(201).send(newConn);
});

/**
 * Permite realizar acciones sobre las conexiones
 * Aprueba una conexión o la cancela dependiendo del estado
 * que se indique en la petición
 */
router.post('/api/connections/actions', CustomAuth, async (req: Request, res: Response) => {
  const { accountNumber, actionStatus } = req.body;
  const user = req.session?.user;
  if (!user) {
    return res.sendStatus(401);
  }
  if (!accountNumber || !actionStatus) {
    return res.status(409).send({ error: true, message: 'operation not allowed' });
  }
  const action: ConnStatus = actionStatus;
  if (action === ConnStatus.SEND) {
    return res.status(409).send({ error: true, message: 'operation not allowed' });
  }

  // Aprueba solo las que ha recibido
  let conn: ConnDoc;
  switch (action) {
    case ConnStatus.APROVED:
      const connToAprove = await Conn.findOne({
        accountSender: accountNumber,
        status: ConnStatus.SEND,
      });

      if (!connToAprove) {
        return res.status(401).send({ error: true, message: 'not found' });
      }
      connToAprove.status = ConnStatus.APROVED;

      await connToAprove.save();
      conn = connToAprove;
      // return res.status(200).send(connToAprove);
      break;

    case ConnStatus.DISABLED: // Solo puede deshabilitar quien ha enviado la petición
      const connToDisabled = await Conn.findOne({
        accountSender: user.accountNumber,
      });

      if (!connToDisabled) {
        return res.status(401).send({ error: true, message: 'not found' });
      }
      connToDisabled.status = ConnStatus.DISABLED;

      await connToDisabled.save();
      conn = connToDisabled;
      break;
  }

  if (!conn) {
    return res.status(401).send({ error: true, message: 'not found' });
  }
  return res.status(200).send(conn);
});

export { router as connRouter };
