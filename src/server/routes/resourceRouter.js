const express = require('express');
const resourceController = require('../controllers/resourceController');
const resourceRouter = express.Router();

// when name (tech_name) is triggered
// return array of resources for that tech(i.e. React) from database
// send results to front-end( store in state) 
// to be used to populate data cards in Feed Container, Feed Item Container, Feed Item

resourceRouter.get('/:techName', 
  resourceController.getResourcesFreeLoader,
  (req, res) => {
    return res.status(200).json(res.locals.resources);
  })


resourceRouter.get('/:techName/:userId', resourceController.getResourcesSignedIn, (req, res) => {
  // USE console.log to SEE resource object => console.log('Send array of resources from get Resources', res.locals.resources);
  return res.status(200).json(res.locals.resources);
});


// adds resource to db
resourceRouter.post(
  '/:userId/:techName',
  resourceController.addResource,
  resourceController.getResourcesSignedIn,
  (req, res) => {
    return res.status(200).json(res.locals.resources)
  }
);

// Add a like and return the new list of resources
resourceRouter.put(
  '/addLike/:resourceId/:userId',
  resourceController.addLike,
  (req, res) => {
    return res.sendStatus(200);
  }
);

resourceRouter.put(
  '/subtractLike/:resourceId/:userId',
  resourceController.subtractLike,
  (req, res) => {
    return res.sendStatus(200); 
  }
);

resourceRouter.put(
  '/addDislike/:resourceId/:userId',
  resourceController.addDislike,
  (req, res) => {
    return res.sendStatus(200);
  }
);

resourceRouter.put(
  '/subtractDislike/:resourceId/:userId',
  resourceController.subtractDislike,
  (rea, res) => {
    return res.sendStatus(200)
  }
);

module.exports = resourceRouter;
