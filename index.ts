import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import getSchema from 'graphql/schema';

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({
    Status: 'Running',
    Developer: 'Himanshu Yadav',
  });
});

(async function () {
  const server = new ApolloServer({
    schema: await getSchema(),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  app.use('/graphql', cors<cors.CorsRequest>(), expressMiddleware(server));
})();

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log('App is up and running'));
