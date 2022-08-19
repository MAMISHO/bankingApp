import { json } from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import 'reflect-metadata';
import { authRouter } from './modules/auth/infra/http/routes/auth';
import { importRouter } from './modules/catalog/infra/http/routes/import';
import { BasicUserDTO } from './modules/users/dtos/user.dto';
import { userRouter } from './modules/users/infra/http/routes/user';
import { graphqlRouter } from './routes/graphql';
// import * as d from './modules/auth/entities/session';

declare module 'express-session' {
  interface SessionData {
    user: BasicUserDTO;
  }
}

const allowedOrigins = 'http://localhost:5000';

const options: cors.CorsOptions = {
  // origin: allowedOrigins,
  origin: function (origin, callback) {
    // allow requests with no origin
    // (like mobile apps or curl requests)
    // if (!origin) return callback(null, true);
    if (!origin || allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not ' + 'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200,
};

// Configuramos el contenedor de servicios para
/*container.register('IUserDAO', {
  useClass: UserMongoDAO,
});
const userMongoDAO = container.resolve(UserMongoDAO);*/

const app = express();

// app.use(cors(options));

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 } }));
app.use(json());
// app.use(todoRouter);
app.use(userRouter);
app.use(authRouter);
app.use(importRouter);
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
  // 'mongodb://db-mongo-cosmos:n0WSrQ9OKRUvcGMmnhFK8j2DT7rBKzqKKCGFVtBZTTMLLNJugnqXHTMwWdxXDkBp8q7Xz7XenNZFyJZkor3hMw==@db-mongo-cosmos.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@db-mongo-cosmos@',
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
