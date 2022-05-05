import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcryptjs';
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import handleImage from './controllers/image.js';

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      port : 5432,
      user : 'postgres',
      password : '9595',
      database : 'smartbrain'
    }
  });

/* db.select('*').from('users').then(data => {
    console.log(data);
}); */

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => { res.send('sucess'); });
app.post('/signin', (req,res) => { handleSignin(req,res,db,bcrypt) });
app.post('/register', (req,res) => { handleRegister(req,res,db,bcrypt) });
app.get('/profile/:id', (req,res) => { handleProfileGet(req,res,db) });
app.put('/image', (req,res) => { handleImage(req,res,db) });


/* bcrypt.hash('bacon', 8, function(err, hash) {
});

bcrypt.compare("B4c0/\/", hash, function(err, res) {
    // res === true
});
bcrypt.compare("not_bacon", hash, function(err, res) {
    // res === false
}); */

app.listen(3000, () => {
    console.log('app running on 3000');
});