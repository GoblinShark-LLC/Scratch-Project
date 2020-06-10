const db = require('./../models/resourceModels'); 
const bcrypt = require('bcrypt');
const saltRounds = 10;

const authController = {};

authController.cryptUserInformation = (req, res, next) => {
  bcrypt.genSalt(saltRounds)
  .then(salt => {
    console.log(`Salt: ${salt}`);
    return bcrypt.hash(req.body.password, salt);
  })
  .then(hash => {
    console.log(`Hash: ${hash}`);
    res.locals.user = {
      user_name: req.body.user_name,
      icon: req.body.icon,
      email: req.body.email,
      token: null,
      password: hash,
    }
    return next()
  })
  .catch(err => next({
    log: 'Error in authController.cryptUserInformation',
    status: 500,
    message: err,
  }));

};

authController.getVerification = (req, res, next) => {
  const { username, password } = req.body;
  const values = [username];
  const queryText = `
    SELECT password from users WHERE user_name = $1;
  `;
  db.query(queryText, values)
  .then(data => {
    const dbPassword = data.rows[0]
    
    bcrypt.hash(password, saltRounds, (err, hash) => {
      bcrypt.compare(dbPassword,hash, (err, success) =>{
        res.locals.user = {
          user_name: req.body.user_name, 
          password: dbPassword,
          token: null,
        }
        return next()
    })})

  }).catch(err => next({
      log: 'Error in authController.getVerification',
      status: 400,
      message: err,
    }));
}

module.exports = authController;
