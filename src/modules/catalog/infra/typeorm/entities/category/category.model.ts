import mongoose from 'mongoose';
import { ICategory } from '../../../entities/category.interface';
import { CategoryDoc } from './category.document';

export interface CategoryModel extends mongoose.Model<CategoryDoc> {
  build(attr: ICategory): CategoryDoc;
}
