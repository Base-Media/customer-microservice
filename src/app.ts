/** @format */

import express from 'express';
import cors from 'cors';
import customerRoutes from './api/customerRoutes';
import addressRoutes from './api/addressRoutes';
import spouseRoutes from './api/spouseRoutes';
import dependentRoutes from './api/dependentRoutes';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', addressRoutes);
app.use('/api', customerRoutes);
app.use('/api/family', spouseRoutes);
app.use('/api/family', dependentRoutes);

export default app;
