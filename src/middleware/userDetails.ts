// src/middleware/attachUser.ts

import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Extend Express’s Request type to include `userDetails`
declare global {
  namespace Express {
    interface Request {
      userDetails?: any;
    }
  }
}

const AUTH_URL = process.env.AUTH_URL!; // e.g. 'http://auth-service:4000'

/**
 * Express middleware that:
 * 1. Reads the Authorization header.
 * 2. Calls your auth service’s `/auth/me` endpoint.
 * 3. Attaches the returned user details onto `req.userDetails`.
 * 4. Calls next(), or returns a 401 if anything fails.
 */
export async function userDetails(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.header('authorization');
  if (!authHeader) {
    res.status(401).json({ message: 'Authorization header required' });
    return;
  }

  try {
    const response = await axios.get(`${AUTH_URL}/auth/me`, {
      headers: { Authorization: authHeader },
    });
    req.userDetails = response.data;
    console.log('User details retrieved:', req.userDetails);
    next();
  } catch (error: any) {
    console.error('Error retrieving user details from auth service:', error.message);
    res.status(401).json({ message: 'Failed to retrieve user details' });
  }
}
