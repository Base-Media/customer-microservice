import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include customerIds
declare global {
  namespace Express {
    interface Request {
      customerIds?: string[];
    }
  }
}
import { fetchCustomerIds } from '../utils/fetchCustomerIds';

/**
 * Middleware that populates req.customerIds based on the user's role.
 * - Admin: fetch by officeId
 * - Agent: fetch by userId
 */
export async function useCustomerIds(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const user = req.userDetails;
  if (!user) {
    res.status(401).json({ message: 'User details missing on request' });
    return; // Ensure the response cycle ends here
  }

  // Build filter based on role
  let filter: Record<string, any> = {};
  if (user.role === 'Admin') {
    if (!user.officeId) {
      res.status(400).json({ message: 'Office ID required for Admin role' });
      return; // Ensure the response cycle ends here
    }
    filter = { officeId: user.officeId };
  } else if (user.role === 'Agent') {
    filter = { userId: user._id };
  }

  try {
    // Fetch matching customer IDs from policy service
    const ids = await fetchCustomerIds(filter);
    req.customerIds = ids;
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error('Error fetching customer IDs:', error);
    res.status(502).json({ message: 'Failed to fetch customer IDs' });
  }
}
