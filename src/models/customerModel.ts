/** @format */

import mongoose, { Document, Schema, model } from 'mongoose';
import EncryptSocial from '../utils/EncryptSocial';

export interface ICustomer extends Document {
  _id: mongoose.Types.ObjectId; // Explicitly define _id
  firstName: string;
  lastName: string;
  middleInitial?: string;
  gender?: string;
  ssn?: string;
  occupation?: string;
  householdIncome?: string;
  phoneNumber: string;
  email?: string;
  ffmId?: string;
  memberId?: string;
  queueId: mongoose.Types.ObjectId;
}

const encryptSocial = new EncryptSocial();
const customerSchema = new Schema<ICustomer>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    middleInitial: {
      type: String,
    },
    gender: {
      type: String,
    },
    ssn: {
      type: String,
      set: (ssn: string) => (ssn ? encryptSocial.encrypt(ssn) : ssn),
      get: (encryptedSsn: string) =>
        encryptedSsn ? encryptSocial.decrypt(encryptedSsn) : encryptedSsn,
    },
    occupation: {
      type: String,
    },
    householdIncome: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    },
    ffmId: {
      type: String,
    },
    memberId: {
      type: String,
    },
    queueId: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true, collection: 'customers' }
);

customerSchema.set('toJSON', { getters: true });
customerSchema.set('toObject', { getters: true });

const Customer = model<ICustomer>('Customer', customerSchema);

export default Customer;
