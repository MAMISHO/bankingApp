import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { Address } from './address.type';
import { Identifier } from './identifier.type';

export const Organization = new GraphQLObjectType({
  name: 'Organization',
  fields: () => ({
    identifiers: {
      type: new GraphQLList(Identifier),
      description: `Espacio de nombres para el valor del identificador. En combinación con el 'value' hacen único el identificador.`,
    },
    name: {
      type: GraphQLString,
      description: `Nombre de la organización`,
    },
    type: {
      type: Address,
      description: `Dirección física de la organización`,
    },
  }),
  description: `Organización humana con algún propósito. Incluyendo compañías, empresas, instituciones, corporaciones, aseguradoras...
  Basado en [FHIR](https://www.hl7.org/fhir/organization.html)`,
});
