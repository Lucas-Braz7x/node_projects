import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import path from 'path';
import { buildSchema } from 'type-graphql';
import dotenv from 'dotenv';

// eslint-disable-next-line import/no-unresolved, import/extensions
import { UserResolver } from './database/resolvers/UserResolver';

async function main() {
  dotenv.config();

  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: path.relative(__dirname, 'schema.gql'),
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen();

  console.log(`Server is running on ${url}`);
}

main();
