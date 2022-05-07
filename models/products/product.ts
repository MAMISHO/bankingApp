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
  nationalCode?: String;
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
  build(attr: IProduct): ProductDoc;
}

export interface ProductDoc extends mongoose.Document {
  code?: String; // código de la industria
  nationalCode?: String;
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
    type: String,
  },
  nationalCode: {
    type: String,
  },
  specialties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Specialty',
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  denomination: {
    type: String,
    required: true,
  },
  presentation: {
    type: String,
    required: true,
  },
  laboratory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Laboratory',
    required: true,
  },
  ingredients: {
    type: String,
  },
  class: {
    type: Class,
  },
  steril: {
    type: Boolean,
  },
  healthIndications: {
    type: String,
  },
  indications: {
    type: String,
  },
  function: {
    type: String,
  },
  howToUse: {
    type: String,
  },
  specialConditions: {
    type: String,
  },
  cautionsWarnings: {
    type: String,
  },
  pao: {
    type: String,
  },
  foodIntolerance: {
    type: String,
  },
  tags: {
    type: String,
  },
});

productSchema.statics.build = (attr: IProduct) => {
  return new Product(attr);
};

const Product = mongoose.model<ProductDoc, productModelInterface>('Product', productSchema);
/*Product.build({
  code: '0',
});*/

export { Product };
