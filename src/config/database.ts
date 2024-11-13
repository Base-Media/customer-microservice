/** @format */

import mongoose from 'mongoose';
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      'mongodb+srv://claude_lamarre:Master7001@synergydash-prod-01.amkflq9.mongodb.net/customers'
    );
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
