import { Class } from '../entities/product.enum';
import { IProduct } from '../entities/product.interface';
import { CategoryDTO } from './category.dto';
import { LaboratoryDTO } from './laboratory.dto';

export class ProductDTO {
  public code?: String;
  public nationalCode?: String;
  public specialties?: [];
  public category?: CategoryDTO;
  public denomination?: String;
  public presentation?: String;
  public laboratory?: LaboratoryDTO;
  public ingredients?: String;
  public class?: Class;
  public steril?: Boolean;
  public healthIndications?: String;
  public indications?: String;
  public function?: String;
  public howToUse?: String;
  public specialConditions?: String;
  public cautionsWarnings?: String;
  public pao?: String;
  public foodIntolerance?: String;
  public tags?: string;

  constructor(props?: IProduct) {
    Object.assign(this, props);
  }
}

export interface ProductFileDTO {
  code?: String;
  nationalCode?: String;
  specialties?: [];
  category?: number;
  denomination?: String;
  presentation?: String;
  laboratory?: number;
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
