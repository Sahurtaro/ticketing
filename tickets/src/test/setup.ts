import jwt from 'jsonwebtoken';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import request from 'supertest';

declare global {
  var signin: () => string[];
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfadf';
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = () => {
  //Build a jwt payload. {id, email}
  const payload = {
    id: 'fadsfdasfa',
    email: 'test@test.com',
  };
  //Create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //Build session object. {jwt: MY_JWT}
  const session = { jwt: token };

  //Turno that session into json
  const sessionJSON = JSON.stringify(session);

  //Take json and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  //Return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
