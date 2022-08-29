import 'dotenv/config';
import express from 'express';
import { CustomAuthRoleAdmin } from '../../../../../shared/policies/auth';
import { ProductController } from '../controllers/product.controller';

const router = express.Router();

router.get('/api/products', CustomAuthRoleAdmin, ProductController.getProducts);
// router.get('/api/categories', CustomAuthRoleAdmin, ImportController.importCategories);

export { router as ProductsRouter };
