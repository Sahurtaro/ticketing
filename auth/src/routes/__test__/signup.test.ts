import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful sign up', async () => {
  return await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
});

it('returns a 400 with an invalid email', async () => {
  return await request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtest.com',
      password: 'password',
    })
    .expect(400);
});

it('returns a 400 with an invalid password', async () => {
  return await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'pa',
    })
    .expect(400);
});

it('returns a 400 with missing email and password', async () => {
  await request(app).post('/api/users/signup').send({ email: 'test@test.com' }).expect(400);
  await request(app).post('/api/users/signup').send({ password: 'asdfqwetgh' }).expect(400);
});

it('disallows duplicate email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});

it('cookie after sucessful singup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
