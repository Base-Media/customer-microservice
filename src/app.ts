/** @format */

import express from 'express';
import cors from 'cors';
import customerRoutes from './api/customerRoutes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', customerRoutes);

export default app;
