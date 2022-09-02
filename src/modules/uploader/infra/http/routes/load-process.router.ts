import 'dotenv/config';
import express from 'express';
import { CustomAuthRoleAdmin } from '../../../../../shared/policies/auth';
import { LoadProcessController } from '../controllers/load-process.controller';

const router = express.Router();

router.get('/api/load-process', CustomAuthRoleAdmin, LoadProcessController.getProcess);
// router.get('/api/categories', CustomAuthRoleAdmin, ImportController.importCategories);

export { router as LoadProcessRouter };
