/** @format */

import express from 'express';
import cors from 'cors';
import customerRoutes from './api/customerRoutes';
import addressRoutes from './api/addressRoutes';
import spouseRoutes from './api/spouseRoutes';
import dependentRoutes from './api/dependentRoutes';

const app = express();
app.use(cors());

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use('/addresses', addressRoutes);
app.use('/customers', customerRoutes);
app.use('/family/spouse', spouseRoutes);
app.use('/family/dependent', dependentRoutes);

export default app;
