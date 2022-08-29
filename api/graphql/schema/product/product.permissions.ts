import { allow } from 'graphql-shield';

export const ProductPermissions = {
  queries: {
    //'*': deny,
    // getProduct: ShieldRules.isAuthenticated,
    getProduct: allow,
  },
  // mutations: {},
};
