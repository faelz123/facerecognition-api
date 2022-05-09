import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: '363ac9e1a7cb4b8fba3e5556ab9fabb1'
   });

const handleApiCall = (req,res) => {
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('something went wrong with the API'))
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