import { AutoMap } from '@automapper/classes';
import { Class } from '../entities/product.enum';
import { IProduct } from '../entities/product.interface';
import { CategoryDTO } from './category.dto';
import { LaboratoryDTO } from './laboratory.dto';

export class ProductDTO {
  @AutoMap()
  public code?: String;
  @AutoMap()
  public nationalCode?: String;
  @AutoMap()
  public specialties?: String[];
  @AutoMap(() => CategoryDTO)
  public category?: CategoryDTO;
  @AutoMap()
  public denomination?: String;
  @AutoMap()
  public presentation?: String;
  @AutoMap(() => LaboratoryDTO)
  public laboratory?: LaboratoryDTO;
  @AutoMap()
  public ingredients?: String;
  @AutoMap()
  public class?: Class;
  @AutoMap()
  public steril?: Boolean;
  @AutoMap()
  public healthIndications?: String;
  @AutoMap()
  public indications?: String;
  @AutoMap()
  public function?: String;
  @AutoMap()
  public howToUse?: String;
  @AutoMap()
  public specialConditions?: String;
  @AutoMap()
  public cautionsWarnings?: String;
  @AutoMap()
  public pao?: String;
  @AutoMap()
  public foodIntolerance?: String;
  @AutoMap()
  public tags?: String[];

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

export interface ProductFileDTOA {
  code?: String;
  nationalCode?: String;
  specialties?: [];
  category?: number;
  denomination?: String;
  presentation?: String;
  laboratory?: number;
  ingredients?: String;
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

export interface ProductCriteriaDTO {
  id?: number;
  uuid?: string;
  code?: string;
  denomination?: string;
  nationalCode?: string;
  status?: boolean;
}
