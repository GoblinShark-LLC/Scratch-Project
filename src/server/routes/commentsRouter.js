const express = require('express');
const commentsRouter = express.Router(); 
const commentsController = require('../controllers/commentsController');


// GET COMMENTS
commentsRouter.get('/:resourceId', 
  commentsController.getComments,
  (req, res) => {
    return res.status(200).json(res.locals.comments);
  }
);

// ADD Comment
commentsRouter.post('/:userId/:resourceId',
  commentsController.addComment,
  commentsController.getComments,
  (req, res) => {
    return res.status(200).json(
      {
        newComment : res.locals.newComment
      }
    )
  }
);

commentsRouter.delete('/:commentId',
  commentsController.deleteComment,
  (req, res) => {
    return res.sendStatus(200); 
  }
);

commentsRouter.put('/:commentId', 
  commentsController.editComment,
  (req, res) => {
    return res.sendStatus(200)
  }
);

module.exports = commentsRouter; 
