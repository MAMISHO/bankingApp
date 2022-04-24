import mongoose from 'mongoose';
import { ICategory } from './category';
import { ILaboratory } from './laboratory';

export enum Class {
  CLASE_I = 'CLASE_I',
  CLASE_Iia = 'CLASE_Iia',
  CLASE_IIb = 'CLASE_IIb',
  CLASE_III = 'CLASE_III',
}

export interface IProduct {
  code?: String;
  nationalcode?: String;
  specialties?: [];
  category?: ICategory;
  denomination?: String;
  presentation?: String;
  laboratory?: ILaboratory;
  ingredients?: String;
  class?: Class;
  steril?: Boolean;
  healthIndications?: String;
  indications?: String;
  function?: String;
  howToUse?: String;
  specialConditions?: String;
  cautionsWarnings?: String;
  pao?: String;
  foodIntolerance?: String;
  tags?: string;
}

interface productModelInterface extends mongoose.Model<ProductDoc> {
  build(attr: IProduct): IProduct;
}

export interface ProductDoc extends mongoose.Document {
  code?: String;
  nationalcode?: String;
  specialties?: [];
  category?: ICategory;
  denomination?: String;
  presentation?: String;
  laboratory?: ILaboratory;
  ingredients?: String;
  class?: Class;
  steril?: Boolean;
  healthIndications?: String;
  indications?: String;
  function?: String;
  howToUse?: String;
  specialConditions?: String;
  cautionsWarnings?: String;
  pao?: String;
  foodIntolerance?: String;
  tags?: string;
}

const productSchema = new mongoose.Schema({
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

productSchema.statics.build = (attr: IProduct) => {
  return new Product(attr);
};

const Product = mongoose.model<ProductDoc, productModelInterface>('Product', productSchema);
Product.build({
  code: '0',
});

export { Product };
