/** @format */

import express, { Request, Response } from 'express';
import connectDB from './config/database';
import appRoutes from './app';

const app = express();

const port = 4000;

app.use(appRoutes);
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
