/** @format */
import { Router } from 'express';
import AddressController from '../controllers/AddressController';

const router = Router();

router.post('/', AddressController.createAddress);
router.put('/:id', AddressController.updateAddress);
router.get(
  '/customer/:customerId',
  AddressController.findAddressByCustomerId
);

export default router;
