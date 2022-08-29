import { GraphQLBoolean, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { NomenclatorTypeEnum } from './enums/nomenclator-type.enum';
import { Identifier } from './identifier.type';
import { Name } from './name.type';
import { Organization } from './organization.type';

export const NomenclatorType = new GraphQLObjectType({
  name: 'Nomenclator',
  fields: () => ({
    uuid: {
      type: GraphQLString,
      description: `Identificador único interno del sistema`,
    },
    identifiers: {
      type: new GraphQLList(Identifier),
      description: `Array de identificadores del medicamento o producto. Usamos tipo _Identifier_ (ver más abajo).
      Diferenets ámbitos o 'system' que podemos encontrar en los identificadores de productos/medicamentos:
      - 'aems:cn' Código nacional de la presentación del medicamento. _(REMPE: id | AEMS: cod_nacion | MUFACE: cn)_
      - 'aems:nro_definitivo': Número de registro del medicamento.
      - 'doe' Denominación Oficial Española. **(Pendiente de estudiar significado real)**`,
    },
    type: {
      type: NomenclatorTypeEnum,
      description: `Enumerado string con el tipo de producto/medicamento.
      _(REMPE: | AEMS:  | MUFACE: tipo_producto)_
      A saber:
      - 'MEDICAMENTO'
      - 'FORMULA_MAGISTRAL'
      - 'DIETOTERAPICO'
      - 'PRODUCTO_SANITARIO'
      - ... **(Pendiente estudiar los tipos)**`,
    },
    status: {
      type: GraphQLBoolean,
      description: ``,
    },
    /*authorizationDate: {
      type: Date,
      description: ``,
    },
    lastUpdate: {
      type: Date,
      description: ``,
    },*/
    manufacturer: {
      type: Organization,
      description: ``,
    },
    comercializer: {
      type: Organization,
      description: ``,
    },
    name: {
      type: Name,
      description: ``,
    },
    images: {
      type: new GraphQLList(GraphQLString),
      description: ``,
    },
    references: {
      type: new GraphQLList(GraphQLString),
      description: ``,
    },
    price: {
      type: GraphQLString,
      description: ``,
    },
    visa: {
      type: GraphQLBoolean,
      description: ``,
    },
    ingredients: {
      type: new GraphQLList(GraphQLString),
      description: ``,
    },
  }),
  description: `Nomenclator de productos`,
});
