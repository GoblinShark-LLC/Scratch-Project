const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

router.post('/signin-auth', authController.getVerification, userController.getUserInformation, (req, res) => {
  return res.status(200).json({user: res.locals.user})
});

module.exports = router;