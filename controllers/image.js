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

export default handleImage;