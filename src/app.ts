/** @format */

import express from 'express';
import customerRoutes from './api/customerRoutes';

const app = express();

app.use(express.json());
app.use('/api', customerRoutes);

export default app;
