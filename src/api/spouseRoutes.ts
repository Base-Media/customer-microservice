/** @format */

import { Router } from 'express';
import SpouseController from '../controllers/SpouseController';

const router = Router();

router.post('/', SpouseController.createSpouse);
router.put('/:id', SpouseController.updateSpouse);
router.get(
  '/customer/:customerId',
  SpouseController.findSpouseByCustomerId
);

export default router;
