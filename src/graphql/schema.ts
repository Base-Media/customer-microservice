/** @format */
import { gql } from 'apollo-server-express';

const schema = gql`
  type Customer {
    id: ID!
    firstName: String!
    lastName: String!
    middleInitial: String
    gender: String
    ssn: String
    dob: String!
    occupation: String
    householdIncome: String
    phoneNumber: String!
    email: String
    officeId: String
    ffmId: String
    memberId: String
    queueId: ID
  }

  type Dependent {
    id: ID!
    firstName: String!
    lastName: String!
    middleInitial: String
    gender: String
    ssn: String
    dob: String!
    customerId: ID!
  }

  type Spouse {
    id: ID!
    firstName: String!
    lastName: String!
    middleInitial: String
    gender: String
    ssn: String
    dob: String!
    customerId: ID!
  }

  type Address {
    id: ID!
    customerId: ID!
    street: String!
    aptUnit: String
    city: String!
    state: String!
    zipCode: String!
    country: String!
  }

  type Query {
    getCustomer(id: ID!): Customer
    getAllCustomers: [Customer]
    getAddressByCustomerId(customerId: ID!): Address
    getDependentByCustomerId(customerId: ID!): [Dependent]
    getSpouseByCustomerId(customerId: ID!): Spouse
    searchCustomers(query: String!): [Customer]
  }

  type Mutation {
    createCustomer(
      firstName: String!
      lastName: String!
      middleInitial: String
      gender: String
      ssn: String
      dob: String!
      occupation: String
      householdIncome: String
      phoneNumber: String!
      email: String
      officeId: String
    ): Customer

    initializeCustomer: Customer

    createAddress(
      customerId: ID!
      street: String!
      aptUnit: String
      city: String!
      state: String!
      zipCode: String!
      country: String!
    ): Address

    createDependent(
      firstName: String!
      lastName: String!
      middleInitial: String
      gender: String
      ssn: String
      dob: String!
      customerId: ID!
    ): Dependent

    createSpouse(
      firstName: String!
      lastName: String!
      middleInitial: String
      gender: String
      ssn: String
      dob: String!
      customerId: ID!
    ): Spouse
  }
`;

export default schema;
