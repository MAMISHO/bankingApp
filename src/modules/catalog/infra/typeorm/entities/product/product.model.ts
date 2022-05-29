import mongoose from 'mongoose';
import { IProduct } from '../../../../entities/product.interface';
import { ProductDoc } from './product.document';

export interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attr: IProduct): ProductDoc;
}
