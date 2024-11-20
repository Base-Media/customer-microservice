/** @format */

import { Request, Response } from 'express';
import DependentService from '../services/DependentService';

class DependentController {
  async createDependent(req: Request, res: Response) {
    try {
      const dependent = await DependentService.createDependent(req.body);
      res.status(201).json(dependent);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateDependent(req: Request, res: Response) {
    try {
      const dependent = await DependentService.updateDependent(
        req.params.id,
        req.body
      );
      res.status(200).json(dependent);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findDependentByCustomerId(req: Request, res: Response) {
    try {
      const dependents = await DependentService.findDependentByCustomerId(
        req.params.customerId
      );
      res.status(200).json(dependents);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new DependentController();
