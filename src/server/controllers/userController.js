const db = require('./../models/resourceModels');

const userController = {};

userController.checkIfExistingUser = (req, res, next) => {
  console.log('checkIfExistingUser', req.body.email)
  let email = req.body.email;
  const values = [email];
  const query = `SELECT * FROM users WHERE email = $1;`
  db.query(query, values)
  .then(data => {
    if(data.rows[0]){
      return next('User already exist, please Login');
    } else {
      return next()
    }
  })
  .catch(err => next({
    log:'Error in userController.checkIfExistingtUser',
    status: 500,
    message: { err: `ERROR in checkIfExistingtUser ${err}` },
  }));
}

userController.postUserInformation =(req,res,next) => {
    console.log('this is data from res.locals.user', res.locals.user)
    let user = res.locals.user
    const values = [user.user_name, user.icon, user.email, user.token, user.password];
    const query = "INSERT INTO users (user_name, icon, email, token, password) VALUES ($1,$2,$3,$4,$5) RETURNING *;"
    db.query(query,values)
    .then(data => {
      console.log('this is data from userController.postUserInformatio', data)
        res.locals.user = data.rows[0]
        return next()
    })
    .catch(err => next({
        log:'Error in userController.postUserInformation',
        status: 500,
        message: { err: `ERROR in postUserInformation ${err}` },
    }))  
}

userController.getUserInformation = (req, res, next) => {
  let {user_name, password, token} = res.locals.user;
  // need to decide what info we want from user
  const query = `SELECT * FROM users WHERE user_name = $1;`
  const values = [user_name];
  console.log(values)
  db.query(query, values)
  .then((data) => {
    console.log('this is data from getUserInformation', data)
    res.locals.user = data.rows[0]
    return next()
  })
  .catch((err) => {
    next({
      log: 'ERROR in userControllers.getUserInformation',
      status: 500,
      message: { err: `ERROR in getUserInformation ${err}` },
      })
    });
};

module.exports = userController;