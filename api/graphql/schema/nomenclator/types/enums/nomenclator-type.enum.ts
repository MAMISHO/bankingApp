import { GraphQLEnumType } from 'graphql';

export const NomenclatorTypeEnum = new GraphQLEnumType({
  name: 'NomenclatorType',
  values: {
    MEDICINE: {
      value: 'MEDICINE',
    },
    PRODUCT: {
      value: 'PRODUCT',
    },
    MASTER_FORMULA: {
      value: 'MASTER_FORMULA',
    },
    DIETOTERAPICO: {
      value: 'DIETOTERAPICO',
    },
    MEDICAL_DEVICES: {
      value: 'MEDICAL_DEVICES',
    },
  },
});
