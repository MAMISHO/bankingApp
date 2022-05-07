import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import os from 'os';
import { ImportController } from '../controllers/importController';

const router = express.Router();
const upload = multer({ dest: os.tmpdir() });

router.post('/api/import/products', upload.single('file'), ImportController.importProducts);
router.post('/api/import/categories', ImportController.importCategories);

export { router as importRouter };
