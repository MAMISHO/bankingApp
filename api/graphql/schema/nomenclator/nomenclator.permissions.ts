import { allow } from 'graphql-shield';

export const NomenclatorPermissions = {
  queries: {
    //'*': deny,
    // getProduct: ShieldRules.isAuthenticated,
    findOneProduct: allow,
  },
  // mutations: {},
};
