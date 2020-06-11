const express = require('express');
const commentsRouter = express.Router(); 
const commentsController = require('../controllers/commentsController');


// GET COMMENTS
commentsRouter.get('/:resourceId', 
((req, res, next) => {
  console.log('made it here!!!!');
  return next();
}),
  commentsController.getComments,
  (req, res) => {
    return res.status(200).json(res.locals.comments);
});

module.exports = commentsRouter; 
