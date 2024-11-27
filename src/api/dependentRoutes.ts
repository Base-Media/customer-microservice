/** @format */

import { Router } from 'express';
import DependentController from '../controllers/DependentController';

const router = Router();

router.post('/dependents', DependentController.createDependent);
router.put('/dependents/:id', DependentController.updateDependent);
router.get(
  '/dependents/customer/:customerId',
  DependentController.findDependentByCustomerId
);

export default router;
