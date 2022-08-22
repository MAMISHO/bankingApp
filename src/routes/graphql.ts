import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { SchemaWithPermissions } from '../../api/graphql/schema/schema';

const router = express.Router();
const queryTest = `
query {
  getUser {
      ... on User {
          id,
          name,
          email,
          role,
          devices {
           ... on Device {
              id,
              name,
              type
              }
          }
      }
  }
}
`;

// Rutas de Graphql
router.use(
  '/graphql',
  // CustomAuth,
  // @ts-ignore
  graphqlHTTP((req, res) => ({
    schema: SchemaWithPermissions,
    context: { req },
    graphiql: {
      // defaultQuery: queryTest,
      headerEditorEnabled: true,
    },
    pretty: true,
  }))
);

export { router as graphqlRouter };
