/** @format */
import { gql } from 'graphql-tag';
import { DateTimeTypeDefinition } from 'graphql-scalars';



const schema = gql`
  ${DateTimeTypeDefinition}

  type Customer @key(fields: "_id") {
    _id: ID!
    firstName: String!
    lastName: String!
    middleInitial: String
    gender: String
    ssn: String
    dob: String!
    occupation: String
    householdIncome: String  
    phoneNumber: String
    email: String
    leadId: String
    
    backOffice: BackOffice 
  }

  type BackOffice @key(fields: "customerId") {
  customerId: ID!
}

  type Dependent @key(fields: "id") {
    id: ID!
    firstName: String!
    lastName: String!
    middleInitial: String
    gender: String
    ssn: String
    dob: String!
    customerId: ID!
  }

  type Spouse @key(fields: "id") {
    id: ID!
    firstName: String!
    lastName: String!
    middleInitial: String
    gender: String
    ssn: String
    dob: String!
    customerId: ID!
  }

  type Address @key(fields: "id") {
    id: ID!
    customerId: ID!
    street: String!
    aptUnit: String
    city: String!
    state: String!
    zipCode: String!
    country: String!
  }


type Comment @key(fields: "_id") {
      _id: ID!
      userId: ID!
      customerId: ID!
      subject: String!
      comment: String!
      createdAt: DateTime!
      user: User @requires(fields: "userId")
}

  extend type User @key(fields: "_id") {
    _id: ID! @external

  }
  type Query {
    getCustomer(_id: ID!): Customer
    getAllCustomers: [Customer]
    getCommentByCustomerId(customerId: ID!): [Comment]
    getAddressByCustomerId(customerId: ID!): Address
    getDependentByCustomerId(customerId: ID!): [Dependent]
    getSpouseByCustomerId(customerId: ID!): Spouse
    searchCustomers(query: String!): [Customer]
  }
`;

export default schema;
