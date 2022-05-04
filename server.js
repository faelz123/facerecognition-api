import express from 'express';
import cors from 'cors';
import knex from 'knex';
import bcrypt from 'bcryptjs';

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

app.get('/', (req,res) => {
    res.send('sucess');
});

app.post('/signin', (req, res) => {
    db.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
        bcrypt.compare(req.body.password, data[0].hash, function(err, response) {
            if(err || !response) {
                res.status(400).json('wrong password')
            } else {
                return db.select('*').from('users')
                .where('email', '=', req.body.email)
                .then(user => {
                    res.json(user[0])
                })
                .catch(error => res.status(400).json('unable to retrieve user'))
            }
        });
    })
    .catch(err => res.status(400).json('wrong email'))
});


app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 8, function(err, hash) {
        if(err) {
            console.log(err);
        } else {
            db.transaction(trx => {
                trx.insert({
                    hash: hash,
                    email: email
                })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0].email,
                        name: name,
                        joined: new Date()
                    })
                    .then(user => {
                        res.json(user[0]);
                    })
                })
                .then(trx.commit)
                .catch(trx.rollback)
            })
            .catch(err => res.status(400).json('Email already exists'))
        }
    });
});

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    db.select('*').from('users').where({id})
    .then(user => {
        if(user.length) {
            res.json(user[0]);
        } else {
            res.status(404).json('user not found');
        }
    })
    .catch(err => res.status(404).json('error retrieving user'));
});

app.put('/image', (req, res) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(404).json('error retrieving entries'))
});


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