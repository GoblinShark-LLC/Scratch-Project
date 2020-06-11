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

commentsController.addComments = (req, res, next) => {
  // comment body is in the request body
  const { body } = req.body; 
  const { userId, resourceId } = req.params;

  const query = `INSERT INTO comments (body, user_id, resource_id) 
                 VALUES ($1, $2, $3)
                 RETURNING _id;`
  
  const values = [body, userId, resourceId];

  db.query(query, values)
    .then()
}

module.exports = commentsController; 