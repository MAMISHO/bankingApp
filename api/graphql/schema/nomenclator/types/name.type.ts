import { GraphQLObjectType, GraphQLString } from 'graphql';

export const Name = new GraphQLObjectType({
  name: 'Name',
  fields: () => ({
    short: {
      type: GraphQLString,
      description: `Nombre corto del producto`,
    },
    long: {
      type: GraphQLString,
      description: `Nombre largo del producto`,
    },
  }),
  description: `Nombres del producto`,
});
