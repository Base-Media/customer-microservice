/** @format */
import express from 'express'; // Use Application from express
import { ApolloServer } from 'apollo-server-express';
import connectDB from './config/database';
import appRoutes from './app';
import schema from './graphql/schema'; // Your GraphQL schema
import resolvers from './graphql/resolvers';
import { buildSubgraphSchema } from '@apollo/subgraph';

const PORT = 4004;
const app = express() as any; // Explicitly type the app as Application


const startApolloServer = async () => {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({ typeDefs:schema, resolvers }),
    formatError: (err) => {
      console.error('GraphQL Error:', err.message);
      return { message: err.message };
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
};

// Initialize Apollo Server
const startServer = async () => {
  try {
///connect to database
await connectDB();


app.get('/health', (req: express.Request, res: express.Response) => {
  console.log('user service is Healthy');
  res.status(200).json({ status: ' user service is Healthy' });
});


 

 await startApolloServer();

 app.use('/api/v1',appRoutes);

 app.listen(PORT, () => {
    console.log(
      `Server is running at http://localhost:${PORT}`);
    console.log(
      `Subgraph running endpoint: http://localhost:${PORT}/graphql`
    );
  });

  }catch (error) {
    console.error('Error starting server:', error);
  }
 
 
};

// Start Apollo Server
startServer();
