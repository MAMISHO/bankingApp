import 'dotenv/config';
import express from 'express';
import { AuthController } from '../controllers/authController';

const router = express.Router();

router.post('/api/login', AuthController.login);
router.post('/api/signup', AuthController.signup);

export { router as authRouter };
