/** @format */

import CustomerService from '../services/CustomerService';
import AddressService from '../services/AddressService';
import DependentService from '../services/DependentService';
import SpouseService from '../services/SpouseService';
import mongoose from 'mongoose';

const resolvers = {
  Query: {
    getCustomer: async (_: any, { id }: { id: string }) => {
      console.log('Received ID:', id);

      if (!id) {
        throw new Error('Customer ID is required');
      }

      if (!mongoose.Types.ObjectId.isValid(id)) {
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
  },

  Mutation: {
    createCustomer: async (_: any, args: any) => {
      return await CustomerService.createCustomer(args);
    },
    initializeCustomer: async (_: any, { officeId }: { officeId: string }) => {
      return await CustomerService.initializeCustomer(officeId);
    },
    createAddress: async (_: any, args: any) => {
      return await AddressService.createAddress(args);
    },
    createDependent: async (_: any, args: any) => {
      return await DependentService.createDependent(args);
    },
    createSpouse: async (_: any, args: any) => {
      return await SpouseService.createSpouse(args);
    },
  },
};

export default resolvers;
