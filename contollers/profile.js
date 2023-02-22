export const profile = (db) => (req, res) => {
  const { id } = req.params;
  let found = false;

  db.select('*')
    .from('users')
    .where({ id })
    .then(user => {
      user.length ? res.json(user[0]) :
        res.status(404).json('user not found');
      ;
    });
}