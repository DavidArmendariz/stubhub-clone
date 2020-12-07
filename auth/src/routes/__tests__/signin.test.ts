import request from 'supertest';
import { app } from '../../app';

describe('When we try to sign in with an email that does not exist', () => {
  test('should return a 400 status', async () => {
    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(400);
  });
});

describe('When we try to sign in to an existing account with an incorrect password', () => {
  test('should return a 400 status', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'incorrect',
      })
      .expect(400);
  });
});

describe('When we try to sign in to an existing account successfully', () => {
  test('should return a 200 status and set a cookie in the response header', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
    const response = await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(200);
    expect(response.get('Set-Cookie')).toBeDefined();
  });
});
