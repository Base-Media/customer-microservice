/** @format */

import express from 'express';
import CustomerController from '../controller/customerController';

const router = express.Router();

router.post('/customers/initialize', CustomerController.initializeCustomer); // Endpoint to initialize a customer
router.post('/customers', CustomerController.createCustomer); // Endpoint to create customer details
router.get('/customers/:id', CustomerController.findCustomerById);
router.get('/customers', CustomerController.findAllCustomers);
router.put('/customers/:id', CustomerController.updateCustomer);
router.delete('/customers/:id', CustomerController.deleteCustomer);

export default router;
