import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import bcrypt from 'bcrypt-nodejs';
import knex from 'knex';

import { register } from './contollers/register.js';
import { signin } from './contollers/signIn.js';
import { image, handleApiCall } from './contollers/image.js';
import { profile } from './contollers/profile.js';

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5432,
    user: 'dmitrii',
    password: '',
    database: 'smart-brain'
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(dataBase.users)
});
app.get('/profile/:id', profile(db));

app.post('/signin', signin(db, bcrypt));
app.post('/register', register(db, bcrypt));
app.post('/imageUrl', handleApiCall);

app.put('/image', image(db));

app.listen(3000, () => {
  console.log('app is running on port 3000')
});