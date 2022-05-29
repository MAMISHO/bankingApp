import mongoose from 'mongoose';
import { ICategory } from '../../../../entities/category.interface';
import { CategoryDoc } from './category.document';
import { CategoryModel } from './category.model';
import { CategorySchema } from './category.schema';

CategorySchema.statics.build = (attr: ICategory) => {
  return new CategoryEntity(attr);
};

const CategoryEntity = mongoose.model<CategoryDoc, CategoryModel>('Category', CategorySchema);

export { CategoryEntity };
