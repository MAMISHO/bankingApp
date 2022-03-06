import { json } from 'body-parser';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import { IUser } from '../models/user';
import { connRouter } from './routes/connection';
import { publicRouter } from './routes/public';
import { todoRouter } from './routes/todo';
import { TransactionRouter } from './routes/transaction';
import { userRouter } from './routes/user';

declare module 'express-session' {
  interface SessionData {
    user: IUser;
  }
}
const app = express();
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }));
app.use(json());
app.use(todoRouter);
app.use(userRouter);
app.use(publicRouter);
app.use(connRouter);
app.use(TransactionRouter);

// mbauser / ThePowerMBA
// "mongodb://localhost:27017/test-todo",
// mongodb+srv://mbauser:<password>@cluster0.sslgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
  'mongodb+srv://mbauser:ThePowerMBA@cluster0.sslgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('connected to database');
  }
);

app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
