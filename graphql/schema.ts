import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFiles } from '@graphql-tools/load-files';

export default async function getSchema() {
  const schema = makeExecutableSchema({
    typeDefs: await loadFiles('graphql/typedefs/**/*.graphql'),
    resolvers: await loadFiles('graphql/resolvers/**/*.{js,ts}'),
  });
  return schema;
}
