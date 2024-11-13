/** @format */

import express, { Request, Response } from 'express';
import connectDB from './config/database';
const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});
connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
