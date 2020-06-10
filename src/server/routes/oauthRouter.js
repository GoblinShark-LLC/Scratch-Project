const express = require('express');
const authController = require('../controllers/oauthController');
const router = express.Router();

// router.get('/:name', resourceController.getResources, (req, res) => {
//   // USE console.log to SEE resource object => console.log('Send array of resources from get Resources', res.locals.resources);
//   return res.status(200).json(res.locals.resources);
// });

router.get('/github', (req, res) => {
  console.log('in the router!');
  return res.status(200).send('nice!');
});

module.exports = router;