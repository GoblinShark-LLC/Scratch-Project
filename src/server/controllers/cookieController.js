const User = require('../models/userModel');
const cookieController = {};

/**
* setCookie - set a cookie with a random number
*/
cookieController.setCookie = (req, res, next) => {
  // write code here
  res.cookie('codesmith', 'hi');
  const random = Math.floor(Math.random() * 100).toString()
  res.cookie('secret', random);
  return next();
}

/**
* setSSIDCookie - store the user id in a cookie
*/
cookieController.setSSIDCookie = (req, res, next) => {
  // write code here
  //different id const userId = res.locals.users._id;
  const userId = res.locals.users.id;
  res.cookie('ssid', userId, {httpOnly: true});
  return next();
}

module.exports = cookieController;