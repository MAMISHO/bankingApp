import express, { Request, Response } from 'express';
import { Conn, ConnDoc, ConnStatus } from '../../models/connection';
import { User } from '../../models/user';
import { CustomAuth } from '../../policies/auth';

const router = express.Router();
// Mis conecciones y las peticiones que he aprobado
router.get(
  '/api/connections',
  CustomAuth,
  async (req: Request, res: Response) => {
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
  }
);

// Peticiones de conexión que me han enviado
router.get(
  '/api/connections/request',
  CustomAuth,
  async (req: Request, res: Response) => {
    const user = req.session?.user;
    if (!user) {
      return res.sendStatus(401);
    }

    const connections = await Conn.find({
      accountReceiver: user.accountNumber,
      status: ConnStatus.SEND,
    });
    return res.status(200).send(connections);
  }
);

router.post(
  '/api/connections',
  CustomAuth,
  async (req: Request, res: Response) => {
    const { accountNumber } = req.body;
    const user = req.session?.user;
    if (!user) {
      return res.sendStatus(401);
    }
    // Verificamos que la cuenta a la que se envía existe
    const userAccount = await User.findOne({ accountNumber: accountNumber });
    if (!userAccount) {
      return res
        .status(404)
        .send({ error: true, message: 'account not found' });
    }
    if (userAccount.accountNumber === user.accountNumber) {
      return res
        .status(409)
        .send({ error: true, message: 'operation not allowed' });
    }
    // Verificamos que no haya alguna
    const connections = await Conn.find({
      accountSender: user.accountNumber,
      accountReceiver: accountNumber,
    });
    if (connections.length > 0) {
      return res
        .status(409)
        .send({ error: true, message: 'connection already exist' });
    }

    const status = ConnStatus.SEND;
    const newConn = Conn.build({
      accountSender: user.accountNumber!,
      accountReceiver: accountNumber,
      status: status,
    });
    await newConn.save();
    return res.status(201).send(newConn);
  }
);

// aprove
router.post(
  '/api/connections/actions',
  CustomAuth,
  async (req: Request, res: Response) => {
    const { accountNumber, actionStatus } = req.body;
    const user = req.session?.user;
    if (!user) {
      return res.sendStatus(401);
    }
    if (!accountNumber || !actionStatus) {
      return res
        .status(409)
        .send({ error: true, message: 'operation not allowed' });
    }
    const action: ConnStatus = actionStatus;
    if (action === ConnStatus.SEND) {
      return res
        .status(409)
        .send({ error: true, message: 'operation not allowed' });
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
  }
);

export { router as connRouter };
