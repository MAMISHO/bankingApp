import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import os from 'os';
import { CustomAuthRoleAdmin } from '../../../../../shared/policies/auth';
import { ImportController } from '../controllers/importController';

const router = express.Router();
const upload = multer({ dest: os.tmpdir() });

router.post('/api/load-process/import', CustomAuthRoleAdmin, upload.single('fileInput'), ImportController.importFromFile);
router.get('/api/load-process/progress', CustomAuthRoleAdmin, ImportController.getProgressProcess);

export { router as ImportRouter };
