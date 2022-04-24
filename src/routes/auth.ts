import 'dotenv/config';
import express from 'express';
import { AuthController } from '../controllers/authController';

const router = express.Router();

router.post('/api/login', AuthController.login);

export { router as authRouter };
