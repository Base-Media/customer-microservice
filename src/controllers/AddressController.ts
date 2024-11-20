/** @format */

import { Request, Response } from 'express';
import AddressService from '../services/AddressService';

class AddressController {
  async createAddress(req: Request, res: Response) {
    try {
      const address = await AddressService.createAddress(req.body);
      res.status(201).json(address);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateAddress(req: Request, res: Response) {
    try {
      const address = await AddressService.updateAddress(
        req.params.id,
        req.body
      );
      res.status(200).json(address);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async findAddressByCustomerId(req: Request, res: Response) {
    try {
      const addresses = await AddressService.findAddressByCustomerId(
        req.params.customerId
      );
      res.status(200).json(addresses);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AddressController();
