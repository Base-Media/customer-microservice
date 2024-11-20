/** @format */

import { Request, Response, NextFunction } from 'express';
import { authenticateToken } from 'user-auth-token';

declare global {
  namespace Express {
    interface Request {
      userDetails?: {
        _id: string;
        officeId: string;
        role: string;
      };
    }
  }
}

const userDetails = (req: Request, res: Response, next: NextFunction) => {
  authenticateToken(
    { authorization: req.headers.authorization },
    (userDetails: any) => {
      req.userDetails = {
        _id: userDetails.userId,
        officeId: userDetails.officeId,
        role: userDetails.role,
      };
      next();
    },
    (statusCode: number, message: string) => {
      res.status(statusCode).json({ error: message });
    }
  );
};

export default userDetails;
