import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcryptjs';
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import {handleImage, handleApiCall} from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
      host : process.env.host || '127.0.0.1',
      port : 5432,
      user : process.env.user || 'postgres',
      password : process.env.pass || '9595',
      database : process.env.db || 'smartbrain'
    }
  });

const PORT = process.env.port || 3000;
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => { res.send('sucess'); });
app.post('/signin', (req,res) => { handleSignin(req,res,db,bcrypt) });
app.post('/register', (req,res) => { handleRegister(req,res,db,bcrypt) });
app.get('/profile/:id', (req,res) => { handleProfileGet(req,res,db) });
app.put('/image', (req,res) => { handleImage(req,res,db) });
app.post('/imageurl', (req,res) => { handleApiCall(req,res) });


app.listen(PORT, () => {
    console.log('app running on 3000');
});