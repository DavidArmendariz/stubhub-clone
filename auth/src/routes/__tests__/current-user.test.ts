import request from 'supertest';
import { app } from '../../app';

describe('When the user is signed', () => {
  test('should respond with details about the current user', async () => {
    const cookie = await global.signup();
    const response = await request(app)
      .get('/api/users/currentuser')
      .set('Cookie', cookie)
      .send()
      .expect(200);
    expect(response.body.currentUser.email).toEqual('test@test.com');
  });
});

describe('When the user is not authenticated', () => {
  test('should respond with null', async () => {
    const response = await request(app)
      .get('/api/users/currentuser')
      .send()
      .expect(200);
    expect(response.body.currentUser).toBeNull();
  });
});
