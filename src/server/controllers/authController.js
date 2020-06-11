const db = require('./../models/resourceModels'); 
const bcrypt = require('bcryptjs');
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
      user_name: req.body.username,
      icon: req.body.icon,
      email: req.body.email,
      token: req.body.token,
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
  console.log('this is req.body from login', req.body.username)
  const username = req.body.username;
  const password = req.body.password;
  const values = [username];
  console.log('this is values from login', username)
  const query = `SELECT password FROM users WHERE user_name = $1;`
  db.query(query, values)
  .then(data => {
    const dbPassword = data.rows[0].password
    console.log('this is dbdbPassword from login', dbPassword)
    
    // bcrypt.hash(password, saltRounds, (err, hash) => {
    //   console.log('this is hash from login', hash)
      // bcrypt.compare(dbPassword,hash, (err, success) =>{
        res.locals.user = {
          user_name: req.body.username, 
          password: dbPassword,
          token: 'null',
        }
        return next()
  // })})
  })
  .catch(err => next({
      log: 'Error in authController.getVerification',
      status: 400,
      message: err,
    }));
}

module.exports = authController;
