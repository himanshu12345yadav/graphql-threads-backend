import { join } from 'node:path';
import { readdirSync, readFileSync } from 'node:fs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import resolvers from 'graphql/resolvers/index';

const gqlFiles = readdirSync(join(__dirname, 'typedefs'));

let typeDefs = '';

gqlFiles.forEach((file) => {
  typeDefs += readFileSync(join(__dirname, 'typedefs', file), {
    encoding: 'utf-8',
  });
});

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
