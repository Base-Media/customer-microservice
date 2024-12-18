/** @format */
import express from 'express'; // Use Application from express
import { ApolloServer } from 'apollo-server-express';
import connectDB from './config/database';
import appRoutes from './app';
import schema from './graphql/schema'; // Your GraphQL schema
import resolvers from './graphql/resolvers';

const app = express() as any; // Explicitly type the app as Application
const port = 5000;

// Middleware for raw request logging

// Connect to MongoDB
connectDB();

// Initialize Apollo Server
const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    formatError: (err) => {
      console.error('GraphQL Error:', err.message);
      return { message: err.message };
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  // Additional Express routes
  app.use(appRoutes);

  // Root route
  app.get('/', (req: any, res: { send: (arg0: string) => void }) => {
    res.send('Hello, world!');
  });

  // Start the server
  app.listen(port, () => {
    console.log(
      `Server is running at http://localhost:${port}${server.graphqlPath}`
    );
  });
};

// Start Apollo Server
startApolloServer();
