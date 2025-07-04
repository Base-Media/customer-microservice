/** @format */

import CustomerService from '../services/CustomerService';
import AddressService from '../services/AddressService';
import DependentService from '../services/DependentService';
import SpouseService from '../services/SpouseService';
import CommentService from '../services/CommentsService';
import mongoose from 'mongoose';
import { DateTimeResolver } from 'graphql-scalars';


const resolvers = {
  DateTime: DateTimeResolver,
  Query: {
    getCustomer: async (_: any, { id }: { id: string }) => {
      console.log('Received ID:', id);

      if (!id) {
        console.error('No ID provided');
        throw new Error('Customer ID is required');
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error(`Invalid customer ID format: ${id}`);
        throw new Error('Invalid customer ID format');
      }

      try {
        const customer = await CustomerService.findCustomerById(id);
        console.log('Fetched Customer:', customer);
        return customer;
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error in getCustomer resolver:', error.message);
        } else {
          console.error('Error in getCustomer resolver:', error);
        }
        throw new Error('Failed to fetch customer');
      }
    },

    getAllCustomers: async () => {
      console.log('Fetching all customers');
      const customers = await CustomerService.findAllCustomers();
      console.log('Fetched customers:', customers);
      return customers;
    },
    searchCustomers: async (_: any, { query }: { query: string }) => {
      return await CustomerService.searchCustomers(query);
    },
    getAddressByCustomerId: async (
      _: any,
      { customerId }: { customerId: string }
    ) => {
      return await AddressService.findAddressByCustomerId(customerId);
    },
    getDependentByCustomerId: async (
      _: any,
      { customerId }: { customerId: string }
    ) => {
      return await DependentService.findDependentByCustomerId(customerId);
    },
    getSpouseByCustomerId: async (
      _: any,
      { customerId }: { customerId: string }
    ) => {
      return await SpouseService.findSpouseByCustomerId(customerId);
    },

    getCommentByCustomerId: async (
      _: any,
      { customerId }: { customerId: string }
    ) => {
      return await CommentService.findCommentsByCustomerId(customerId);
    }
  },

  Comment:{
    user: async (parent: any) => {
      return { __typename: 'User', _id: parent.userId };
    }
  },

  
  Customer: {
    __resolveReference: async (parent: any) => {
      console.log('Resolving reference for customer:',parent);
      return await CustomerService.findCustomerById(parent._id);
    },
    backOffice: async (parent: any) => {
      return {__typename:'BackOffice',customerId: parent._id};
  }
}, 
 
};

export default resolvers;
