import { PojosMetadataMap } from '@automapper/pojos';
import { ProductFileDTO } from '../../dtos/product.dto';

// https://automapperts.netlify.app/docs/strategies/pojos
export function createProductFileMetadata() {
  PojosMetadataMap.create<ProductFileDTO>('ProductFileDTO', {
    code: String,
    nationalCode: String,
    specialties: [String],
    category: Number,
    denomination: String,
    presentation: String,
    laboratory: Number,
    ingredients: String,
    class: Number,
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
