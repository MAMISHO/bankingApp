import { GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { NomenclatorHelper } from '../../helpers/nomenclator.helper';
import { NomenclatorType } from './types/nomenclator.type';
// import { DeviceInputType } from '../device/device.types';

export const NomenclatorQueries = {
  findOneProduct: {
    type: new GraphQLList(NomenclatorType),
    name: 'findOneProduct',
    description: 'Búsca un producto con los parámetros',
    args: {
      code: { type: GraphQLString },
      nationalCode: { type: GraphQLString },
      denomination: { type: GraphQLString },
      type: { type: GraphQLString! },
    },
    resolve: (root: any, params: any, options: any, info: any) => {
      // A este punto llega solo si se ha autenticado
      // componemos el usuario en el caso de requerir algo de la autenticación
      /*
      const user: UserDTO = new UserDTO({ ...options.user });
      const isAdmin = !user.isAdmin();
      */

      if (!params || !params.type || Object.keys(params).length === 0) {
        throw new Error('params required');
      }

      if (params.denomination) {
        // Devolvemos los datos sel usuario de la sesión
        return NomenclatorHelper._findProduct(params.denomination, params.type);
      }
      return null;
    },
  },
};

export const NomenclatorSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'NomenclatorQueries',
    fields: NomenclatorQueries,
    description: 'Esquema búsqueda en nomenclator',
  }),
  description: 'Descripción del productos',
});
