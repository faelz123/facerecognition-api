import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'john@gmail.com',
            password: 'krai',
            entries: 0,
            joined: new Date()
        },
        {
            id: '122',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'kroi',
            entries: 0,
            joined: new Date()
        }
    ]
}


app.get('/', (req,res) => {
    res.send(database.users);
});

app.post('/signin', (req, res) => {
    if  (req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json(database.users[0]);
    } else {
        res.status(400).json('error loging in');
    }
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    database.users.push ({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    });
    res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if (!found) {
        res.status(404).json('user not found');
    }
});

app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if(user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!found) {
        res.status(404).json('user not found');
    }
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