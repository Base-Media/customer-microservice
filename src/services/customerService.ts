/** @format */

import Customer, { ICustomer } from '../models/customerModel';
import { Types } from 'mongoose';

class CustomerService {
  // Create a new customer
  async createCustomer(data: Partial<ICustomer>): Promise<ICustomer> {
    const customer = new Customer(data);
    return await customer.save();
  }

  // Find a customer by ID
  async findCustomerById(id: string): Promise<ICustomer | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid customer ID');
    }
    return await Customer.findById(id).exec();
  }

  // Find all customers
  async findAllCustomers(): Promise<ICustomer[]> {
    return await Customer.find().exec();
  }

  // Update a customer by ID
  async updateCustomer(
    id: string,
    data: Partial<ICustomer>
  ): Promise<ICustomer | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid customer ID');
    }
    return await Customer.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // Delete a customer by ID
  async deleteCustomer(id: string): Promise<ICustomer | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid customer ID');
    }
    return await Customer.findByIdAndDelete(id).exec();
  }
}

export default new CustomerService();
