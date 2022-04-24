import mongoose from 'mongoose';

export interface ICategory {
  code: number;
  name: string;
  description: string;
}

interface categoryModelInterface extends mongoose.Model<CategoryDoc> {
  build(attr: ICategory): CategoryDoc;
}

export interface CategoryDoc extends mongoose.Document {
  code: number;
  name: string;
  description: string;
}

const categorySchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

categorySchema.statics.build = (attr: ICategory) => {
  return new Category(attr);
};

const Category = mongoose.model<CategoryDoc, categoryModelInterface>('Category', categorySchema);
Category.build({
  code: 0,
  name: 'Otros',
  description: 'Sin categoría',
});

export { Category };
