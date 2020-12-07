import request from 'supertest';
import { app } from '../../app';

describe('When we sign up successfully', () => {
  test('should return a 201 status', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
  });
  test('should set a cookie in the headers', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password',
      })
      .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
  });
});

describe('When we sign up with an invalid email', () => {
  test('should return a 400 status', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test',
        password: 'password',
      })
      .expect(400);
  });
});

describe('When we sign up with an invalid password', () => {
  test('should return a 400 status', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'p',
      })
      .expect(400);
  });
});

describe('When we sign up with missing email and password', () => {
  test('should return a 400 status', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({ email: 'test@test.com' })
      .expect(400);
    await request(app)
      .post('/api/users/signup')
      .send({ password: 'password' })
      .expect(400);
  });
});

describe('When we try to sign up with the same email', () => {
  test('should disallow this behavior', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({ email: 'test@test.com', password: 'password' })
      .expect(201);
    await request(app)
      .post('/api/users/signup')
      .send({ email: 'test@test.com', password: 'password' })
      .expect(400);
  });
});
