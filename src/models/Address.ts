/** @format */

import mongoose, { Document, Schema, model } from 'mongoose';

export interface IAddress extends Document {
  customerId: mongoose.Types.ObjectId; // Reference to the associated customer
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string; // Optional, for international use
}

const addressSchema = new Schema<IAddress>(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'Customer', // Reference to the Customer collection
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: 'USA', // Default country (if most addresses are in the USA)
    },
  },
  { timestamps: true, collection: 'addresses' } // Adds createdAt and updatedAt fields
);

const Address = model<IAddress>('Address', addressSchema);

export default Address;
