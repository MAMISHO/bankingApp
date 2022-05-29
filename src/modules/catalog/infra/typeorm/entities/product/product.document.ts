import mongoose from 'mongoose';
import { ICategory } from '../../../../entities/category.interface';
import { ILaboratory } from '../../../../entities/laboratory.interface';
import { Class } from '../../../../entities/product.enum';

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
