/** @format */
import { Router } from 'express';
import AddressController from '../controllers/AddressController';

const router = Router();

router.post('/addresses', AddressController.createAddress);
router.put('/addresses/:id', AddressController.updateAddress);
router.get(
  '/addresses/customer/:customerId',
  AddressController.findAddressByCustomerId
);

export default router;
