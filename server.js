import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcryptjs';
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import {handleImage, handleApiCall} from './controllers/image.js';

/*// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9TfUyR3MJyeimfD_yEQ3XszDe-FFAZ0c",
  authDomain: "facefindapp.firebaseapp.com",
  projectId: "facefindapp",
  storageBucket: "facefindapp.appspot.com",
  messagingSenderId: "420293148326",
  appId: "1:420293148326:web:99c0ad947c9f0d0b5afe67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 */
const db = knex({
    client: 'pg',
    connection: {
      connectionString: `postgres://facefindb_user:NtAdGEEolEuwBnV3WyBT2AJYIn6dvTTq@dpg-cg7pf92k728uq3pmltag-a.ohio-postgres.render.com/facefindb`,
      ssl: { rejectUnauthorized: false },
    }
  });

console.log(process.env.DATABASE_URL);

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