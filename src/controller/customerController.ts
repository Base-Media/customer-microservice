/** @format */

import { Request, Response } from 'express';
import CustomerService from '../services/customerService';

class CustomerController {
  // Create a new customer
  async createCustomer(req: Request, res: Response): Promise<void> {
    try {
      const formDetails = req.body;
      const userId = formDetails.userId || req.userDetails?._id;
      const officeId = formDetails.officeId || req.userDetails?.officeId;
      const customerData = { ...formDetails, userId, officeId };
      const customer = await CustomerService.createCustomer(customerData);
      res.status(201).json(customer);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Find a customer by ID
  async findCustomerById(req: Request, res: Response): Promise<void> {
    try {
      const customer = await CustomerService.findCustomerById(req.params.id);
      if (!customer) {
        res.status(404).json({ error: 'Customer not found' });
      } else {
        res.status(200).json(customer);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Find all customers
  async findAllCustomers(req: Request, res: Response): Promise<void> {
    try {
      const customers = await CustomerService.findAllCustomers();
      res.status(200).json(customers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a customer by ID
  async updateCustomer(req: Request, res: Response): Promise<void> {
    try {
      const customer = await CustomerService.updateCustomer(
        req.params.id,
        req.body
      );
      if (!customer) {
        res.status(404).json({ error: 'Customer not found' });
      } else {
        res.status(200).json(customer);
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Delete a customer by ID
  async deleteCustomer(req: Request, res: Response): Promise<void> {
    try {
      const customer = await CustomerService.deleteCustomer(req.params.id);
      if (!customer) {
        res.status(404).json({ error: 'Customer not found' });
      } else {
        res.status(200).json({ message: 'Customer deleted successfully' });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new CustomerController();
