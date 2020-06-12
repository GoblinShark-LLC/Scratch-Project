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
                ORDER BY comments.created_at DESC;`;

  const value = [resourceId];

  db.query(query, value)
    .then((data) => {
      // stored fetched data in res.locals
      console.log('data just fetched :', data.rows);
      res.locals.comments = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Error in commentsController.getComments',
        message: { err: `ERROR in commentsController.getComments ${err}` },
      });
    });
};

commentsController.addComment = (req, res, next) => {
  console.log('in the addComments controller');
  // comment body is in the request body
  const { body } = req.body;

  // id of commenting user, and id or resource on which they are commenting is in req.params
  const { userId, resourceId } = req.params;

  const addQuery = `INSERT INTO comments (body, user_id, resource_id) 
                 VALUES ($1, $2, $3)
                 RETURNING *;`;
  const addValues = [body, userId, resourceId];

  // get all data for a given comment, including name/avatar of the user
  const getDetailsQuery = `SELECT comments.*, users.user_name, users.icon 
                            FROM comments 
                            JOIN users 
                            ON comments.user_id = users._id 
                            WHERE comments._id = $1
                            ORDER BY comments.created_at DESC;`;

  db.query(addQuery, addValues)
    .then((id) => {
      // send back id of newly created comment
      console.log('finished insert query');
      let newCommentId = id.rows[0]._id;
      return db.query(getDetailsQuery, [newCommentId]);
    })
    .then((data) => {
      console.log('data just fetched :', data.rows);
      res.locals.newComment = data.rows;
      next();
    })
    .catch((err) => {
      return next({
        log: 'Error in commentsController.addComment',
        message: { err: `ERROR in commentsController.addComment ${err}` },
      });
    });
};

commentsController.deleteComment = (req, res, next) => {
  // id of desired comment in req.params
  const { commentId } = req.params;

  const query = `DELETE FROM comments 
                 WHERE _id = $1; `;

  const value = [commentId];

  db.query(query, value)
    .then(() => next())
    .catch((err) => {
      return next({
        log: 'Error in commentsController.deleteComment',
        message: { err: `ERROR in commentsController.deleteComment ${err}` },
      });
    });
};

commentsController.editComment = (req, res, next) => {
  // updated comment is in req.body
  const { body } = req.body;

  // id of comment in req.params
  const { commentId } = req.params;

  const query = `UPDATE comments 
                 SET body = $1, last_updated = CURRENT_TIMESTAMP, edited = true  
                 WHERE _id = $2;`;

  const values = [body, commentId];

  db.query(query, values)
    .then(() => next())
    .catch((err) => {
      return next({
        log: 'Error in commentsController.editComment',
        message: { err: `ERROR in commentsController.editComment ${err}` },
      });
    });
};

module.exports = commentsController;
