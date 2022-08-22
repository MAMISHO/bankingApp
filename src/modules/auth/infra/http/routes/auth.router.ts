import 'dotenv/config';
import express from 'express';
import { CustomCorsConfig } from '../../../../../config/cors.conf';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();

router.post('/api/login', CustomCorsConfig, AuthController.login);
router.post('/api/signup', CustomCorsConfig, AuthController.signup);

export { router as authRouter };
