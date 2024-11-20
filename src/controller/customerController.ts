/** @format */

import { Request, Response } from 'express';
import CustomerService from '../services/CustomerService';

class CustomerController {
  // Create a new customer
  async createCustomer(req: Request, res: Response): Promise<void> {
    try {
      const formDetails = req.body;
      const customerData = { ...formDetails };
      const customer = await CustomerService.createCustomer(customerData);
      res.status(201).json(customer);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  async initializeCustomer(req: Request, res: Response): Promise<void> {
    try {
      const { _id } = await CustomerService.initializeCustomer();
      res.status(201).json({ _id }); // Respond with the generated _id
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
