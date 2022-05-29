import { ICategory } from './category.interface';
import { ILaboratory } from './laboratory.interface';
import { Class } from './product.enum';

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
