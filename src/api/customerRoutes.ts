/** @format */

import express from 'express';
import CustomerController from '../controllers/CustomerController';
import userDetails from '../middleware/userDetails';
const router = express.Router();

router.post(
  '/initialize',
  userDetails,
  CustomerController.initializeCustomer
); // Endpoint to initialize a customer
router.post('/', CustomerController.createCustomer); // Endpoint to create customer details
router.get('/:id', CustomerController.findCustomerById);
router.get('/all-customers', CustomerController.findAllCustomers);
router.get('/search', CustomerController.searchCustomers);
router.put('/:id', CustomerController.updateCustomer);
router.delete('/:id', CustomerController.deleteCustomer);
router.get('/search', CustomerController.searchCustomers);

export default router;
