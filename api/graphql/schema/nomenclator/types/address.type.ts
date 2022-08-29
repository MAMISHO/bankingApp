import { GraphQLObjectType, GraphQLString } from 'graphql';

export const Address = new GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    text: {
      type: GraphQLString,
      description: `Representación de la dirección`,
    },
    postalCode: {
      type: GraphQLString,
      description: `Código postal`,
    },
    cityName: {
      type: GraphQLString,
      description: `Nombre del municipio. Si no se marca el municipalityCode y si se rellena este campo se buscará un municipio con el nombre descrito (nombre del INE http://www.ine.es/daco/daco42/codmun/codmunmapa.htm).`,
    },
    cityCode: {
      type: GraphQLString,
      description: `Nombre de la provincia. (Codificación INE: http://www.ine.es/daco/daco42/codmun/cod_provincia.htm)`,
    },
    districtName: {
      type: GraphQLString,
      description: `Código de la provincia. (Codificación INE: http://www.ine.es/daco/daco42/codmun/cod_provincia.htm)`,
    },
    districtCode: {
      type: GraphQLString,
      description: `Nombre de la región o comunidad autónoma. (Codificación INE: http://www.ine.es/daco/daco42/codmun/cod_ccaa.htm)`,
    },
    stateName: {
      type: GraphQLString,
      description: `Código de la región o comunidad autónoma. (Codificación INE: http://www.ine.es/daco/daco42/codmun/cod_ccaa.htm)`,
    },
    stateCode: {
      type: GraphQLString,
      description: `Nombre del país. (Se utilizará la codificación ISO 3166-1 codigo alpha-2)`,
    },
    countryName: {
      type: GraphQLString,
      description: `Nombre del país. (Se utilizará la codificación ISO 3166-1 codigo alpha-2)`,
    },
    countryCode: {
      type: GraphQLString,
      description: `Código del país. (Se utilizará la codificación ISO 3166-1 codigo alpha-2)`,
    },
  }),
  description: `Dirección física.
  Basado en [FHIR](https://www.hl7.org/fhir/datatypes.html#Address).`,
});
