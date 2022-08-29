import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import os from 'os';
import { CustomAuthRoleAdmin } from '../../../../../shared/policies/auth';
import { ImportController } from '../controllers/importController';

const router = express.Router();
const upload = multer({ dest: os.tmpdir() });

router.post('/api/import/products', CustomAuthRoleAdmin, upload.single('fileInput'), ImportController.importProducts);
router.post('/api/import/categories', CustomAuthRoleAdmin, ImportController.importCategories);

export { router as importRouter };
