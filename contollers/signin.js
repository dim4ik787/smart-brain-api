export const signin = (db, bcrypt) => (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('incorrect form submission.');
  }

  db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then(data => {
      if (bcrypt.compareSync(password, data[0].hash)) {
        return db.select('*')
          .from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json('error loggined in'));
      }
    })
    .catch(err => res.status(400).json('unable to log in'));
}