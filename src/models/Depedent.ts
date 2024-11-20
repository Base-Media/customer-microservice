/** @format */

import mongoose, { Document, Schema, model } from 'mongoose';
import EncryptSocial from '../utils/EncryptSocial';

export interface IDependent extends Document {
  _id: mongoose.Types.ObjectId; // Explicitly define _id
  firstName: string;
  lastName: string;
  middleInitial?: string;
  gender?: string;
  ssn?: string;
  customerId: mongoose.Types.ObjectId;
  dob: Date;
}

const encryptSocial = new EncryptSocial();

const depedentSchema = new Schema<IDependent>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    middleInitial: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: Date,
    },
    customerId: {
      type: Schema.Types.ObjectId,
    },
    ssn: {
      type: String,
      required: true,
      set: (ssn: string) => (ssn ? encryptSocial.encrypt(ssn) : ssn),
      get: (encryptedSsn: string) =>
        encryptedSsn ? encryptSocial.decrypt(encryptedSsn) : encryptedSsn,
    },
  },
  { timestamps: true, collection: 'dependents' }
);

depedentSchema.set('toJSON', { getters: true });
depedentSchema.set('toObject', { getters: true });

const Dependent = model<IDependent>('Depedent', depedentSchema);
export default Dependent;
