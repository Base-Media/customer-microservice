import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Customer, CustomerDocument } from './customer.schema';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async createCustomer(customerData: any): Promise<Customer> {
    const customer = new this.customerModel(customerData);
    return await customer.save();
  }

  async findCustomerById(id: string): Promise<Customer | null> {
    console.log('Validating and fetching customer with ID:', id);
    if (!Types.ObjectId.isValid(id)) {
      console.error('Invalid ObjectId format');
      throw new BadRequestException('Invalid ObjectId format');
    }

    try {
      const customer = await this.customerModel.findById(new Types.ObjectId(id));
      console.log('Customer found:', customer);
      return customer;
    } catch (error) {
      console.error('Error querying database:', error);
      throw new Error('Database query failed');
    }
  }

  async findAllCustomers(): Promise<Customer[]> {
    try {
      const customers = await this.customerModel.find({});
      return customers;
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }

  async searchCustomers(query: string): Promise<Customer[]> {
    console.log('Received query:', query, 'Type:', typeof query);
    if (typeof query !== 'string') {
      throw new BadRequestException('Invalid query: Query must be a string');
    }
    const regex = new RegExp(query, 'i');
    return await this.customerModel.find({
      $or: [
        { firstName: regex },
        { lastName: regex },
        { phoneNumber: regex },
      ],
    }).exec();
  }

  async findCustomersByIds(ids: string[], searchTerm?: string): Promise<Customer[]> {
    const filter: Record<string, any> = { 
      _id: { $in: ids.map(id => new Types.ObjectId(id)) } 
    };
    if (searchTerm) {
      filter.$text = { $search: searchTerm };
    }
    return this.customerModel.find(filter).exec();
  }

  async updateCustomer(id: string, customerData: any): Promise<Customer | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid customer ID');
    }
    return await this.customerModel.findByIdAndUpdate(id, customerData, { new: true }).exec();
  }

  async deleteCustomer(id: string): Promise<Customer | null> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid customer ID');
    }
    return await this.customerModel.findByIdAndDelete(id).exec();
  }
}