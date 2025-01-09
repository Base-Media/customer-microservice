/** @format */

import { Router } from 'express';
import DependentController from '../controllers/DependentController';

const router = Router();

router.post('/', DependentController.createDependent);
router.put('/:id', DependentController.updateDependent);
router.get(
  '/customer/:customerId',
  DependentController.findDependentByCustomerId
);

export default router;
