/** @format */

import { Request, Response } from 'express';
import CustomerService from '../services/CustomerService';

class CustomerController {
  /**
   * Asynchronously creates a new customer using the provided request data.
   *
   * @param req - The HTTP request object containing customer details in the body.
   * @param res - The HTTP response object used to send back the created customer or an error message.
   * @returns A Promise that resolves to void.
   */
  async createCustomer(req: Request, res: Response): Promise<void> {
    try {
      const formDetails = req.body;
      const officeId = req.userDetails?.officeId;
      const customerData = { ...formDetails, officeId };
      const customer = await CustomerService.createCustomer(customerData);
      res.status(201).json(customer);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Asynchronously initializes a customer and sends a response with the generated customer ID.
   *
   * @param req - The request object.
   * @param res - The response object.
   * @returns A promise that resolves to void.
   */
  async initializeCustomer(req: Request, res: Response): Promise<void> {
    try {
      const officeId = req.userDetails?.officeId;
      if (!officeId) {
        res.status(400).json({ error: 'Office ID is required' });
        return;
      }
      const { _id } = await CustomerService.initializeCustomer(officeId);
      res.status(201).json({ _id }); // Respond with the generated _id
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Asynchronously finds a customer by their ID.
   *
   * @param req - The request object containing the customer ID in the parameters.
   * @param res - The response object used to send back the appropriate HTTP response.
   * @returns A promise that resolves to void. Sends a JSON response with the customer data if found,
   *          a 404 error if the customer is not found, or a 500 error if an exception occurs.
   */
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
  /**
   * Handles the request to find and return all customers.
   *
   * @param req - The request object from the client.
   * @param res - The response object to send data back to the client.
   * @returns A promise that resolves to void. Sends a JSON response with the list of customers
   *          if successful, or an error message if an error occurs.
   */
  async findAllCustomers(req: Request, res: Response): Promise<void> {
    try {
      const customers = await CustomerService.findAllCustomers();
      res.status(200).json(customers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Search customers
  /**
   * Handles the request to search for customers based on a query string.
   *
   * @param req - The request object containing the query parameter 'q' which is used to search customers.
   * @param res - The response object used to send back the search results or an error message.
   * @returns A promise that resolves to void. Sends a JSON response with the search results or an error status.
   */
  async searchCustomers(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.q as string;
      const customers = await CustomerService.searchCustomers(query);
      res.status(200).json(customers);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  // Update a customer by ID
  /**
   * Asynchronously updates a customer by their ID.
   *
   * @param req - The request object containing the customer ID in the parameters and updated data in the body.
   * @param res - The response object used to send back the updated customer or an error message.
   * @returns A promise that resolves to void. Sends a JSON response with the updated customer data if successful,
   *          a 404 error if the customer is not found, or a 500 error if an exception occurs.
   */
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
