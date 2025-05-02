/** @format */

import express from 'express';
import CustomerController from '../controllers/CustomerController';
import { userDetails } from "../middleware/userDetails";
import { useCustomerIds } from '../middleware/useCustomerIds';

const router = express.Router();

// 1) Static routes first:
router.get(
  '/search',
  userDetails,
  useCustomerIds,
  CustomerController.search
);

router.get('/all-customers', CustomerController.findAllCustomers);

// 2) Then the dynamic “/:id” route:
router.get('/:id', CustomerController.findCustomerById);

// 3) And finally any “root” or catch-all:
router.get('/', (req, res, next) => {
  console.log('Search route hit with query:', req.query.q);
  next();
}, CustomerController.searchCustomers);

router.post('/', CustomerController.createCustomer);
router.put('/:id', CustomerController.updateCustomer);
router.delete('/:id', CustomerController.deleteCustomer);

export default router;
