import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { AuthController } from '../controllers/authController';

const allowedOrigins = 'http://localhost:4200';

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

const router = express.Router();

router.post('/api/login', cors(options), AuthController.login);
router.post('/api/signup', cors(options), AuthController.signup);

export { router as authRouter };
