/** @format */

import Customer, { ICustomer } from '../models/customerModel';
import { Types } from 'mongoose';

class CustomerService {
  async initializeCustomer(): Promise<{ _id: string }> {
    const customer = new Customer(); // Create a new instance without saving
    return { _id: customer._id.toString() }; // Only return the _id
  }
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

  // search customers
  async searchCustomers(query: string): Promise<ICustomer[]> {
    const regex = new RegExp(query, 'i'); // 'i' for case-insensitive
    return await Customer.find({
      $or: [{ firstName: regex }, { lastName: regex }, { phoneNumber: regex }],
    }).exec();
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
