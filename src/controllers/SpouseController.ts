/** @format */

import { Request, Response } from 'express';
import SpouseService from '../services/SpouseService';

class SpouseController {
  async createSpouse(req: Request, res: Response) {
    try {
      const spouse = await SpouseService.createSpouse(req.body);
      res.status(201).json(spouse);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateSpouse(req: Request, res: Response) {
    try {
      const spouse = await SpouseService.updateSpouse(req.params.id, req.body);
      res.status(200).json(spouse);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findSpouseByCustomerId(req: Request, res: Response) {
    try {
      const spouses = await SpouseService.findSpouseByCustomerId(
        req.params.customerId
      );
      console.log('heres the spouse:', spouses);
      res.status(200).json(spouses);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new SpouseController();
