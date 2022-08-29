import { stitchSchemas } from '@graphql-tools/stitch';
import { applyMiddleware } from 'graphql-middleware';
import { deny, shield } from 'graphql-shield';
import { NomenclatorPermissions } from './nomenclator/nomenclator.permissions';
import { NomenclatorSchema } from './nomenclator/nomenclator.schema';
import { ProductPermissions } from './product/product.permissions';
import { ProductSchema } from './product/product.schema';
// import { DevicePermissions } from './device/device.permissions';
// import { DeviceSchema } from './device/device.schema';
import { UserPermissions } from './user/user.permissions';
import { UserSchema } from './user/user.schema';

// Configuramos los subschemas
const userSchema = { schema: UserSchema };
const productSchema = { schema: ProductSchema };
const nomenclatorSchema = { schema: NomenclatorSchema };
// const deviceSchema = { schema: DeviceSchema };

// Unimos los subschemas en un schema global
const schema = stitchSchemas({
  subschemas: [userSchema, productSchema, nomenclatorSchema],
});

/**
 * Importamos todas las reglas de consulta y modificación de cada schema
 */
const schemaPermissions = shield({
  Query: {
    '*': deny,
    ...UserPermissions.queries,
    ...ProductPermissions.queries,
    ...NomenclatorPermissions.queries,
    // ...DevicePermissions.queries,
  },
  // Mutation: {
  // ...UserPermissions.mutations,
  // ...DevicePermissions.mutations,
  // },
});

// Aplicamos las reglas al schema
/*
module.exports.schemaWithPermissions = applyMiddleware(
  schema,
  schemaPermissions
);
*/
//
export const SchemaWithPermissions = applyMiddleware(schema, schemaPermissions);
export const Schema = schema;
