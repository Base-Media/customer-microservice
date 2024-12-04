/** @format */

import express from 'express';
import CustomerController from '../controllers/CustomerController';
import userDetails from '../middleware/userDetails';
const router = express.Router();

router.post(
  '/customer/initialize',
  userDetails,
  CustomerController.initializeCustomer
); // Endpoint to initialize a customer
router.post('/customers', CustomerController.createCustomer); // Endpoint to create customer details
router.get('/customers/:id', CustomerController.findCustomerById);
router.get('/customers', CustomerController.findAllCustomers);
router.get('/customer/search', CustomerController.searchCustomers);
router.put('/customers/:id', CustomerController.updateCustomer);
router.delete('/customers/:id', CustomerController.deleteCustomer);

export default router;
