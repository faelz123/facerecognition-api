import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '363ac9e1a7cb4b8fba3e5556ab9fabb1'
   });

const handleApiCall = (req,res) => {
    app.models.predict({
        id: "a403429f2ddf4b49b307e318f00e528b",
        version: "34ce21a40cc24b6b96ffee54aabff139",
      }, req.body.input)
    .then(data => res.json(data))
    .catch(err => console.error(err))
   }

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(404).json('error retrieving entries'))
}

export {handleImage , handleApiCall};