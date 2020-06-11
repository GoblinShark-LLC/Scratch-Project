const db = require('./../models/resourceModels');

const commentsController = {}; 

commentsController.getComments = (req, res, next) => {
  // id of resource is is req.params
  const { resourceId } = req.params; 

  const query = `SELECT comments.*, users.user_name, users.icon 
                FROM comments 
                JOIN users 
                ON comments.user_id = users._id 
                WHERE comments.resource_id = $1
                ORDER BY comments.created_at DESC;`

  const value = [resourceId];

  db.query(query, value)
    .then(data => {
      // stored fetched data in res.locals
      console.log('data just fetched :', data)
      res.locals.comments = data.rows;
      return next();
    })
    .catch(err => {
      return next({
        log: 'Error in commentsController.getComments',
        message: { err: `ERROR in commentsController.getComments ${err}` },
      })
    })
};

commentsController.addComment = (req, res, next) => {
  // comment body is in the request body
  const { body } = req.body; 

  // id of commenting user, and id or resource on which they are commenting is in req.params
  const { userId, resourceId } = req.params;

  const query = `INSERT INTO comments (body, user_id, resource_id) 
                 VALUES ($1, $2, $3)
                 RETURNING *;`
  
  const values = [body, userId, resourceId];

  db.query(query, values)
    .then(id => {
      // send back id of newly created comment
      res.locals.commentId = id.rows[0]._id;
      return next();
    })
    .catch(err => {
      return next({
        log: 'Error in commentsController.addComment',
        message: { err: `ERROR in commentsController.addComment ${err}` },
      })
    })
};

commentsController.deleteComment = (req, res, next) => {
  // id of desired comment in req.params
  const { commentId } = req.params; 

  const query = `DELETE FROM comments 
                 WHERE _id = $1; `
  
  const value = [ commentId ]; 

  db.query(query, value)
    .then(() => next())
    .catch(err => {
      return next({
        log: 'Error in commentsController.deleteComment',
        message: { err: `ERROR in commentsController.deleteComment ${err}` },
      })
    })
};



module.exports = commentsController; 