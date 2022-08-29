import { GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { ProductHelper } from '../../helpers/product.helper';
import { ProductType } from './product.types';
// import { DeviceInputType } from '../device/device.types';

export const ProductQueries = {
  getProduct: {
    type: ProductType,
    name: 'product',
    description: 'Esquema Product, TODO: añadir doc',
    args: {
      code: { type: GraphQLString },
      nationalCode: { type: GraphQLString },
    },
    resolve: (root: any, params: any, options: any, info: any) => {
      // A este punto llega solo si se ha autenticado
      // componemos el usuario en el caso de requerir algo de la autenticación
      /*
      const user: UserDTO = new UserDTO({ ...options.user });
      const isAdmin = !user.isAdmin();
      */

      if (!params || Object.keys(params).length === 0) {
        return null;
      }
      if (params.nationalCode) {
        // Devolvemos los datos sel usuario de la sesión
        return ProductHelper._getProductByCN(params.nationalCode);
      }
      if (params.code) {
        // Devolvemos los datos sel usuario de la sesión
        return ProductHelper._getProductByCode(params.code);
      }
      if (params.uuid) {
        return ProductHelper._getProductByUUID(params.uuid);
      }
      return null;
    },
  },
};

export const ProductMutations = {
  addProduct: {
    type: ProductType,
    args: {
      /*data: {
        name: 'data',
        type: new GraphQLNonNull(DeviceInputType),
      },*/
    },
    resolve: (root: any, params: any, options: any, info: any) => {
      const data = { ...params.data };
      if (data) {
        return ProductHelper._addProduct(data);
      }
      return null;
    },
  },
};

export const ProductSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'ProductQueries',
    fields: ProductQueries,
    description: 'Esquema que representa a los productos del catálogo',
  }),
  description: 'Descripción del producs',
});
