/** @format */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const customerDbUri = process.env.CUSTOMER_DB_URI as string;
    
    if (!customerDbUri) {
      throw new Error('CUSTOMER_DB_URI environment variable is not defined');
    }

    const conn = await mongoose.connect(customerDbUri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('Unknown error');
    }
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connectDB;
