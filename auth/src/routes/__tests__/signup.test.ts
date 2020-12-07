import request from 'supertest';
import { app } from '../../app';

describe('When we sign up successfully', () => {
  test('should return a 201', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
  });
});
