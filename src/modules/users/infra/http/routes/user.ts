import express from 'express';
import { CustomAuth } from '../../../../../shared/policies/auth';
import { UserController } from '../controllers/userController';

const router = express.Router();

// Rutas de Usuarios
router.get('/api/users', CustomAuth, UserController.getUsers);
router.post('/api/users', UserController.createUser);

export { router as userRouter };
