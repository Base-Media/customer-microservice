/** @format */

import mongoose, { Document, Schema, model } from 'mongoose';

export interface ICustomer extends Document {
  firstName: string;
  lastName: string;
  middleInitial?: string;
  gender?: string;
  ocupation?: string;
  householdIncome: string;
  phoneNumber: string;
  email?: string;
  ffmId?: string;
  memberId?: string;
  queueId: mongoose.Types.ObjectId;
  officeId: mongoose.Types.ObjectId;
}
