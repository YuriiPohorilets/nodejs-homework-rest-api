const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');

describe('Test logInUser controller', () => {
  beforeAll(async () => mongoose.connect(process.env.DB_URL));
  afterAll(async () => mongoose.disconnect());

  it('Should login user.', async () => {
    const response = await request(app).post('/api/users/login').send({
      email: 'user-test@mail.com',
      password: '123qwe',
    });

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
      token: expect.any(String),
      user: {
        email: 'user-test@mail.com',
        subscription: expect.any(String),
      },
    });
  });
});
