/** @format */

import express from 'express';
import cors from 'cors';
import customerRoutes from './api/customerRoutes';
import addressRoutes from './api/addressRoutes';
import axios from 'axios';
import spouseRoutes from './api/spouseRoutes';
import dependentRoutes from './api/dependentRoutes';
import commentRoutes from './api/commentRoutes';


const app = express();
app.use(cors({
    origin: [ 'http://localhost:5173','http://localhost:5174', 'https://main.d39s06ite0zb3q.amplifyapp.com', 'https://main.d1xyxumoctgjix.amplifyapp.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use('/addresses', addressRoutes);
app.use('/customers', customerRoutes);
app.use('/family/spouse', spouseRoutes);
app.use('/family/dependent', dependentRoutes);
app.use('/comments', commentRoutes);

app.get('/api/retrieve', async (req, res) => {
    try {
      const response = await axios.get('https://api.convoso.com/v1/log/retrieve', {
        params: req.query, // Forward query parameters
      });
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data from API.' });
    }
  });
export default app;
