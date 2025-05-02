import axios, { AxiosInstance } from 'axios';
import dotenv from 'dotenv';
dotenv.config();

// Ensure you have POLICY_URL set in your environment (e.g. http://localhost:4005/api/v1)
const POLICY_URL = process.env.POLICY_URL;

if (!POLICY_URL) {
  throw new Error('POLICY_URL environment variable is not defined');
}

const policyClient: AxiosInstance = axios.create({
  baseURL: POLICY_URL,
  timeout: 5000,
});

/**
 * Fetches all customer IDs matching the given filter from the Policy microservice.
 *
 * @param filter - Any valid Mongoose filter for policy documents (e.g. { userId, officeId })
 * @returns Array of unique customerId strings
 */
export async function fetchCustomerIds(
  filter: Record<string, any> = {}
): Promise<string[]> {
  console.log('Fetching customer IDs with filter:', filter);
  try {
    const response = await policyClient.post<string[]>('/policy-search/customer-ids', filter);
    return response.data;
  } catch (error) {
    // You can refine error handling based on your needs
    console.error('Error fetching customer IDs from policy service:', error);
    throw error;
  }
}

export default policyClient;
