/** @format */

import { Router } from 'express';
import SpouseController from '../controllers/SpouseController';

const router = Router();

router.post('/spouses', SpouseController.createSpouse);
router.put('/spouses/:id', SpouseController.updateSpouse);
router.get(
  '/spouses/customer/:customerId',
  SpouseController.findSpouseByCustomerId
);

export default router;
