/** @format */

import express from 'express';
import CustomerController from '../controller/customerController';
import userDetails from '../middleware/userDetails';

const router = express.Router();

router.post('/customer', userDetails, CustomerController.createCustomer);
// ...existing code...

export default router;
