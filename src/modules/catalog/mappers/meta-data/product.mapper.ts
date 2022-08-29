import { PojosMetadataMap } from '@automapper/pojos';
import { ProductDTO } from '../../dtos/product.dto';
import { IProduct } from '../../entities/product.interface';

// https://automapperts.netlify.app/docs/strategies/pojos
export function createProductMetadata() {
  PojosMetadataMap.create<IProduct>('IProduct', {
    code: String,
    nationalCode: String,
    specialties: [String],
    category: 'ICategory',
    denomination: String,
    presentation: String,
    laboratory: 'ILaboratory',
    ingredients: String,
    class: String,
    steril: Boolean,
    healthIndications: String,
    indications: String,
    function: String,
    howToUse: String,
    specialConditions: String,
    cautionsWarnings: String,
    pao: String,
    foodIntolerance: String,
    tags: [String],
  });

  PojosMetadataMap.create<ProductDTO>('ProductDTO', {
    code: String,
    nationalCode: String,
    specialties: [String],
    category: 'CategoryDTO',
    denomination: String,
    presentation: String,
    laboratory: 'LaboratoryDTO',
    ingredients: String,
    class: String,
    steril: Boolean,
    healthIndications: String,
    indications: String,
    function: String,
    howToUse: String,
    specialConditions: String,
    cautionsWarnings: String,
    pao: String,
    foodIntolerance: String,
    tags: [String],
  });
}
