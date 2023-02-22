import Clarifai from 'clarifai';

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: 'd161c440f8744ec5b7ebfb0cbea438c8'
});

export const handleApiCall = (req, res) => {
  app.models
    .predict(
      {
        id: "a403429f2ddf4b49b307e318f00e528b",
        version: "34ce21a40cc24b6b96ffee54aabff139",
      },
      req.body.imageUrl)
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'));

}


export const image = (db) => (req, res) => {
  const { id } = req.body;
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('unable to update entries'));
}