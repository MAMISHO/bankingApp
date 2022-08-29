import { GraphQLObjectType, GraphQLString } from 'graphql';

export const Identifier = new GraphQLObjectType({
  name: 'Identifier',
  fields: () => ({
    system: {
      type: GraphQLString,
      description: `Espacio de nombres para el valor del identificador. En combinación con el 'value' hacen único el identificador.`,
    },
    value: {
      type: GraphQLString,
      description: `Valor único`,
    },
    type: {
      type: GraphQLString,
      description: `Descripción del identificador`,
    },
  }),
  description: `Identificador único. Se suele usar como array.
    Basado en [FHIR](https://www.hl7.org/fhir/datatypes.html#Identifier).`,
});
