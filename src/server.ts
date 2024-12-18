/** @format */

import express, { Request, Response } from 'express';
import connectDB from './config/database';
import appRoutes from './app';
import { graphqlHTTP } from 'express-graphql';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
const app = express();

const port = 5000;

app.use(appRoutes);
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
    customFormatErrorFn: (err) => {
      console.error('GraphQL Error:', err.message);
      return { message: err.message };
    },
  })
);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
