import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
//import routes from './routes/index.js';
import { ApolloServer } from '@apollo/server';// Note: Import from @apollo/server-express
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from './schemas/index.js';
import { authenticateToken } from './utils/auth.js';
import { Request, Response } from 'express';


const server = new ApolloServer({
  typeDefs,
  resolvers
});

const PORT = process.env.PORT || 3001;
const app = express();

const startApolloServer = async () => {
  await server.start();
  await db();


  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server as any,
    {
      context: authenticateToken as any
    }
  ));

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
}



db().then(() => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
}).catch((err) => {
  console.error('Failed to connect to the database:', err);
});

startApolloServer();