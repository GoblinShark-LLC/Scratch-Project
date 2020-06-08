const express = require('express');
const resourceController = require('../controllers/resourceController');
const router = express.Router();

// Get an array of resource objects and return them
//  resourceController.getResources,
router.get('/:name', resourceController.getResources, (req, res) => {
  console.log('eofjiehkrsndslkf');
  return res.status(200).json(res.locals.resources);
});

// Add new resource to the database and return the new list of resources
router.post(
  '/:name',
  resourceController.getTechId,
  resourceController.addResource,
  resourceController.getResources,
  (req, res) => {
    return res.status(200).json(res.locals.resources);
  }
);

// Add a like and return the new list of resources
router.put(
  '/upvote',
  resourceController.addLike,
  resourceController.getResources,
  (req, res) => {
    return res.status(200).json(res.locals.resources);
  }
);

// // Subtract a like and return the new list of resources
router.put(
  '/downvote',
  resourceController.subtractLike,
  resourceController.getResources,
  (req, res) => {
    return res.status(200).json(res.locals.resources);
  }
);

module.exports = router;
