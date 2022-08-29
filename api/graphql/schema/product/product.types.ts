import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

export const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    code: { type: GraphQLString, description: 'Es un código designado por la industria' },
    nationalCode: { type: GraphQLString },
    specialties: { type: new GraphQLList(GraphQLString) },
    denomination: { type: GraphQLString },
    /*devices: {
        type: new GraphQLList(DeviceType),
        name: 'devices',
      },*/
    // devices: DeviceQueries.getDevices,
  }),
  description: `Este es el contrato del producto
  Es mejor poner la documentación al final de toda la definición para no causar
  ruido al momento de ver la definición`,
});
