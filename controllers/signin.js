const handleSignin = (req, res, db, bcrypt) => {
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
}

export default handleSignin;