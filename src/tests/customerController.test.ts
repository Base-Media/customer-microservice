/** @format */

import request from 'supertest';
import express from 'express';
import customerRoutes from '../api/customerRoutes';
import CustomerService from '../services/customerService';

const app = express();
app.use(express.json());
app.use('/api', customerRoutes);

const token =
  'eyJraWQiOiJic1FJUjFMSnY5SjJOd3RHZ0czVFZSXC9tTUtNYjhIUWxuYmZGdGlRTVN2TT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIyZjg1OTYzOC1hZDQwLTQ1NjAtOWZhYS0xN2E4Y2I2ZWVjNWQiLCJjb2duaXRvOmdyb3VwcyI6WyJBZG1pbiJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0yLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMl8yNGt1ak1GYVkiLCJjbGllbnRfaWQiOiI2MTBzZGViY2pxZ29uazA1bjEzMXJ2ZWZnMSIsIm9yaWdpbl9qdGkiOiI5MDI0ODA2Ni1hZjhmLTQwMGUtOTE5MC01YTNkZGM2ZmVlZDUiLCJldmVudF9pZCI6IjI5MTIzYTc1LWMyZGQtNDk4YS1iZTdhLWZmNjJjOThkNTczMiIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE3MzE2MTE5NDIsImV4cCI6MTczMTY5ODM0MiwiaWF0IjoxNzMxNjExOTQyLCJqdGkiOiJhY2MzYjdlZC1mNmM2LTQzNTYtYWNiMC01ZDliNjI4NDMwZDEiLCJ1c2VybmFtZSI6ImNsYW1hcnJlIn0.gWnGTA6XiMWZazxy4LPRstL3h7fUs0OXaoWl9YP8RQJhWPVb3an61Jn89cUtf8UXLWacVYiiUmObckyUaDu3mBKZLbhZwGzr7jenF-TVSnFWn8u5x7lZxJ-z4fCkl30sc58EXU6VYldLRw3xdv1EZRZPvTO-av5qVzl8IxtSV1p44KGFov9N2VO9g93GD33Y3fOjOleJzGPDEIwwj0aJjXd5qQf8yfYol5UNuofzY2lPd5MGXNSAfC0xVxjNTel9gJkg8zad5CNPaJx4In67OL1vLNzwdKRZ18h5w_x8AMB4HvORqpQLLjoQeRM3HRn327-gxRvA_rPEGXMCT0jqDA';
jest.mock('../services/customerService');

describe('CustomerController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/customer', () => {
    it('should create a new customer', async () => {
      const mockCustomer = {
        _id: '1',
        name: 'John Doe',
        userId: '123',
        officeId: '456',
      };
      (CustomerService.createCustomer as jest.Mock).mockResolvedValue(
        mockCustomer
      );

      const response = await request(app)
        .post('/api/customer')
        .send({ name: 'John Doe' })
        .set('Authorization', `Bearer ${token}`); // Set the Authorization header

      expect(response.status).toBe(201);
      expect(response.body).toEqual(mockCustomer);
    });

    it('should return 500 if there is an error', async () => {
      (CustomerService.createCustomer as jest.Mock).mockRejectedValue(
        new Error('Internal Server Error')
      );

      const response = await request(app)
        .post('/api/customer')
        .send({ name: 'John Doe' })
        .set('Authorization', `Bearer ${token}`); // Set the Authorization header

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
    });
  });

  // Add more tests for other methods (findCustomerById, findAllCustomers, updateCustomer, deleteCustomer)
});
