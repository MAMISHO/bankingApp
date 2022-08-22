import { createMap, createMapper } from '@automapper/core';
import { pojos, PojosMetadataMap } from '@automapper/pojos';
import { injectable } from 'tsyringe';
import { ProductFileDTO } from '../dtos/product.dto';
import { ICategory } from '../entities/category.interface';
import { ILaboratory } from '../entities/laboratory.interface';
import { IProduct } from '../entities/product.interface';

export function createProductFileMetadata() {
  PojosMetadataMap.create<ICategory>('ICategory', {
    code: Number,
    name: String,
    description: String,
  });

  PojosMetadataMap.create<ILaboratory>('ILaboratory', {
    code: Number,
    name: String,
    license: String,
  });

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
    tags: String,
  });

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
    tags: String,
  });
}

createProductFileMetadata();

const mapper = createMapper({ strategyInitializer: pojos() });

createMap<ProductFileDTO, IProduct>(
  mapper,
  'ProductFileDTO', // this needs to match what we passed in PojosMetadataMap.create()
  'IProduct' // this needs to match what we passed in PojosMetadataMap.create()
);

@injectable()
export class ProductFileMapper {
  constructor() {}
  public toDTO(product: IProduct): ProductFileDTO {
    return mapper.map<IProduct, ProductFileDTO>(
      product,
      'IProduct', // this needs to match what we passed in PojosMetadataMap.create()
      'ProductFileDTO' // this needs to match what we passed in PojosMetadataMap.create()
    );
  }

  public toEntity(product: ProductFileDTO): IProduct {
    return mapper.map<ProductFileDTO, IProduct>(
      product,
      'ProductFileDTO', // this needs to match what we passed in PojosMetadataMap.create()
      'IProduct' // this needs to match what we passed in PojosMetadataMap.create()
    );
  }
}
