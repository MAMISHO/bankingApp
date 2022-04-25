import { json } from 'body-parser';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import 'reflect-metadata';
import { IUser } from '../models/user/user.model';
import { authRouter } from './routes/auth';
import { graphqlRouter } from './routes/graphql';
import { userRouter } from './routes/user';

declare module 'express-session' {
  interface SessionData {
    user: IUser;
  }
}

// Configuramos el contenedor de servicios para
/*container.register('IUserDAO', {
  useClass: UserMongoDAO,
});
const userMongoDAO = container.resolve(UserMongoDAO);*/

const app = express();
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }));
app.use(json());
// app.use(todoRouter);
app.use(userRouter);
app.use(authRouter);
app.use(graphqlRouter);
// app.use(connRouter);
// app.use(TransactionRouter);

// mbauser / ThePowerMBA
// "mongodb://localhost:27017/test-todo",
// mongodb+srv://mbauser:<password>@cluster0.sslgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// 'mongodb+srv://mbauser:ThePowerMBA@cluster0.sslgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
// 'mongodb://localhost:27017/products',
// 'mongodb://localhost:27017/products',
mongoose.connect(
  'mongodb://localhost:27017/products',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('connected to database');
  }
);
/*
mongoose.connect(
  'mongodb://db-mongo-cosmos:n0WSrQ9OKRUvcGMmnhFK8j2DT7rBKzqKKCGFVtBZTTMLLNJugnqXHTMwWdxXDkBp8q7Xz7XenNZFyJZkor3hMw==@db-mongo-cosmos.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@db-mongo-cosmos@',
  {
    // auth: {
    //  user: 'db-dps-cosmos',
    //  password: 'Xmt5Cu1jgn3CCZD2kImordE7FF3hkLnJ3sKrXtST7qjYdqT4MM2DY7UbD9DraORo6WZ1m0Y9m7cZi5gthW1NDA==',
    // },
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: false,
  },
  (erro) => {
    console.log(erro);
    console.log('connected to database');
  }
);*/

app.listen(3000, () => {
  console.log('server is listening on port 3000');
});
