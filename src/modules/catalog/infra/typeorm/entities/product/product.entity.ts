import mongoose from 'mongoose';
import { IProduct } from '../../../../entities/product.interface';
import { ProductDoc } from './product.document';
import { ProductModel } from './product.model';
import { ProductSchema } from './product.schema';
ProductSchema.statics.build = (attr: IProduct) => {
  return new ProductEntity(attr);
};

const ProductEntity = mongoose.model<ProductDoc, ProductModel>('Product', ProductSchema);

export { ProductEntity };
