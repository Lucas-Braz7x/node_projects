import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import path from 'path';
import { buildSchema } from 'type-graphql';
import dotenv from 'dotenv';

// eslint-disable-next-line import/no-unresolved, import/extensions
import { UserResolver } from './database/resolvers/UserResolver';

dotenv.config();

async function main() {
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: path.relative(__dirname, '../schema.gql'),
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await server.listen({ port: process.env.SERVER_PORT || 4000 });

  console.log(`Server is running on ${url}`);
}

main();
