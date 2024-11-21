/** @format */

import Customer, { ICustomer } from '../models/customerModel';
import { Types } from 'mongoose';

class CustomerService {
  /**
   * Initialize a new customer, save the officeId, and generate its ID.
   * @param {string} officeId - The office ID to associate with the customer.
   * @returns {Promise<{ _id: string }>} - The generated customer ID.
   */
  async initializeCustomer(officeId: string): Promise<{ _id: string }> {
    const customer = new Customer({ officeId }); // Create a new customer with officeId
    await customer.save(); // Save the customer to the database
    return { _id: customer._id.toString() }; // Return the generated _id
  }

  /**
   * Create a new customer with provided details and save it to the database.
   * @param {Partial<ICustomer>} data - The details of the customer to create.
   * @returns {Promise<ICustomer>} - The saved customer object.
   */
  async createCustomer(data: Partial<ICustomer>): Promise<ICustomer> {
    const customer = new Customer(data); // Create a new customer instance
    return await customer.save(); // Save the customer to the database
  }

  /**
   * Find a customer by their unique ID.
   * @param {string} id - The ID of the customer to find.
   * @returns {Promise<ICustomer | null>} - The customer object if found, or null if not found.
   * @throws {Error} - If the provided ID is invalid.
   */
  async findCustomerById(id: string): Promise<ICustomer | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid customer ID'); // Validate the ID
    }
    return await Customer.findById(id).exec(); // Find the customer by ID
  }

  /**
   * Find all customers in the database.
   * @returns {Promise<ICustomer[]>} - An array of all customer objects.
   */
  async findAllCustomers(): Promise<ICustomer[]> {
    return await Customer.find().exec(); // Retrieve all customers
  }

  /**
   * Search for customers based on a query string.
   * Matches against first name, last name, or phone number.
   * @param {string} query - The search query string.
   * @returns {Promise<ICustomer[]>} - An array of matching customer objects.
   */
  async searchCustomers(query: string): Promise<ICustomer[]> {
    const regex = new RegExp(query, 'i'); // Create a case-insensitive regex
    return await Customer.find({
      $or: [
        { firstName: regex }, // Match first name
        { lastName: regex }, // Match last name
        { phoneNumber: regex }, // Match phone number
      ],
    }).exec(); // Execute the search
  }

  /**
   * Update a customer by their ID with the provided data.
   * @param {string} id - The ID of the customer to update.
   * @param {Partial<ICustomer>} data - The updated customer details.
   * @returns {Promise<ICustomer | null>} - The updated customer object, or null if not found.
   * @throws {Error} - If the provided ID is invalid.
   */
  async updateCustomer(
    id: string,
    data: Partial<ICustomer>
  ): Promise<ICustomer | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid customer ID'); // Validate the ID
    }
    return await Customer.findByIdAndUpdate(id, data, { new: true }).exec(); // Update the customer
  }

  /**
   * Delete a customer by their ID.
   * @param {string} id - The ID of the customer to delete.
   * @returns {Promise<ICustomer | null>} - The deleted customer object, or null if not found.
   * @throws {Error} - If the provided ID is invalid.
   */
  async deleteCustomer(id: string): Promise<ICustomer | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid customer ID'); // Validate the ID
    }
    return await Customer.findByIdAndDelete(id).exec(); // Delete the customer
  }
}

export default new CustomerService();
