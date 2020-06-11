const express = require('express');
const commentsRouter = express.Router(); 
const commentsController = require('../controllers/commentsController');


// GET COMMENTS
commentsRouter.get('/:resourceId', 
  commentsController.getComments,
  (req, res) => {
    return res.status(200).json(res.locals.comments);
});

// ADD Comment
commentsRouter.post('/:userId/:resourceId',
  commentsController.addComment,
  (req, res) => {
    return res.status(200).json({
      newCommentId : res.locals.commentId
    })
})

commentsRouter.delete('/:commentId',
  commentsController.deleteComment,
  (req, res) => {
    return res.sendStatus(200); 
  })

module.exports = commentsRouter; 
