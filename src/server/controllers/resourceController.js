const db = require('./../models/resourceModels');

// Initialize controller object
const resourceController = {};

// free loader sends resources, but without like info, as you must be a member to like resources
resourceController.getResourcesFreeLoader = (req, res, next) => {
  // tech name stored in req.params
  const { techName } = req.params; 

  const query = `SELECT * 
                 FROM resources 
                 WHERE resources.tech = $1 
                 ORDER BY likes DESC;`; 

  const value = [techName]; 

  db.query(query, value)
    .then(data => {
      res.locals.resources = data.rows;
      return next(); 
    })
    .catch((err) =>
      next({
        log: 'ERROR in resourceControllers.getResourcesFreeLoader',
        message: { err: `ERROR in getResourcesFreeLoader ${err}` },
      })
    );
}

// Get all resources from the db based on tech name, fired when user presses sideNav button
resourceController.getResourcesSignedIn = (req, res, next) => {
  // id of user, as well as name of desired tech is in req.params
  const { techName, userId } = req.params;
  
  const query = `SELECT resources.*, likes.liked 
           FROM resources  
           LEFT JOIN likes 
           ON resources._id = likes.resource_id 
           AND likes.user_id = $1 
           WHERE resources.tech = $2 
           ORDER BY likes DESC;`;

  const values = [userId, techName];
  db.query(query, values)
    .then((query) => {
      res.locals.resources = query.rows;
      return next();
    })
    .catch((err) =>
      next({
        log: 'ERROR in resourceControllers.getResources',
        message: { err: `ERROR in getResources ${err}` },
      })
    );
};

// Creates a new resource by combining a tech id and the request body info
resourceController.addResource = (req, res, next) => {
  // get info related to resource from req.body
  const { name, description, url, tech } = req.body;

  const query = `INSERT INTO resources (name, description, likes, url, tech) 
                VALUES ($1, $2, 0, $3, $4)
                RETURNING *;`

  const values = [name, description, url, tech];

  db.query(query, values)
    .then((query) => {
      // store new Resource in res.locals
      res.locals.newResource = query.rows[0];
      return next();
    })
    .catch((err) =>
      next({
        log: 'ERROR in resourceControllers.addResource',
        message: { err: `ERROR in addResource ${err}` },
      })
    );
};

// Increase the like count of a resource by one
resourceController.addLike = (req, res, next) => {

  // capture resourceId and userId from req.params
  const { resourceId, userId } = req.params;
  
  // Adding new like to likes table, incrementing likes count in resources by one

  // add user's like to the Likes table
  const addToLikesTable = `INSERT INTO likes (liked, resource_id, user_id) 
                           VALUES (true, $1, $2)
                           RETURNING _id;` 

  // increments current like count on resource
  const incLikes = `UPDATE resources 
                    SET likes = likes + 1 
                    WHERE _id = $1;`

  const values = [resourceId, userId];

  
  // For transactions in node-postgres, must do each command in transaction as separate queries
  db.query('BEGIN;')
    .then(db.query(addToLikesTable, values))
    .then(db.query(incLikes, [resourceId]))
    .then(db.query('COMMIT;'))
    .then(() => next())
    .catch(err => {
      return next({
        log: 'ERROR in resourceController.addLike',
        message: { err: `ERROR in resourceController.addLike  ${err}` },
      })
  })
};

// Decrease the like count of a resource by one
resourceController.subtractLike = (req, res, next) => {
  // capture resourceId and userId from req.params
  const { resourceId, userId } = req.params;

  // Adding new like to likes table, incrementing likes count in resources by one

  // add user's like to the Likes table
  const deleteFromLikesTable = `DELETE FROM likes 
                                WHERE resource_id = $1
                                AND user_id = $2;` 

  // increments current like count on resource
  const decLikes = `UPDATE resources 
                    SET likes = likes - 1 
                    WHERE _id = $1;`

  const values = [resourceId, userId];

  
  // For transactions in node-postgres, must do each command in transaction as separate queries
  db.query('BEGIN;')
    .then(db.query(deleteFromLikesTable, values))
    .then(db.query(decLikes, [resourceId]))
    .then(db.query('COMMIT;'))
    .then(() => next())
    .catch(err => {
      return next({
        log: 'ERROR in resourceController.subtractLike',
        message: { err: `ERROR in resourceController.subtractLike  ${err}` },
      })
  })
};


// Decrease the like count of a resource by one
resourceController.addDislike = (req, res, next) => {
  // capture resourceId and userId from req.params
  const { resourceId, userId } = req.params;

  // Adding new like to likes table, incrementing likes count in resources by one

  // add user's like to the Likes table
  const addToLikesTable = `INSERT INTO likes (liked, resource_id, user_id) 
                           VALUES (false, $1, $2);`  

  // increments current like count on resource
  const decLikes = `UPDATE resources 
                    SET likes = likes - 1 
                    WHERE _id = $1;`

  const values = [resourceId, userId];

  
  // For transactions in node-postgres, must do each command in transaction as separate queries
  db.query('BEGIN;')
    .then(db.query(addToLikesTable, values))
    .then(db.query(decLikes, [resourceId]))
    .then(db.query('COMMIT;'))
    .then(() => next())
    .catch(err => {
      return next({
        log: 'ERROR in resourceController.addDislike',
        message: { err: `ERROR in resourceController.addDislike  ${err}` },
      })
  })
};

// undo a dislike
resourceController.subtractDislike = (req, res, next) => {
  // capture resourceId and userId from req.params
  const { resourceId, userId } = req.params;

  // Deleting likes from likes table, decrementing likes count in resources by one

  // delete user's like
  const deleteFromLikesTable = `DELETE FROM likes 
                                WHERE resource_id = $1
                                AND user_id = $2;` 

  // increments current like count on resource

  const incLikes = `UPDATE resources 
                    SET likes = likes + 1 
                    WHERE _id = $1;`

  const values = [resourceId, userId];

  
  // For transactions in node-postgres, must do each command in transaction as separate queries
  db.query('BEGIN;')
    .then(db.query(deleteFromLikesTable, values))
    .then(db.query(incLikes, [resourceId]))
    .then(db.query('COMMIT;'))
    .then(() => next())
    .catch(err => {
      return next({
        log: 'ERROR in resourceController.subtractLike',
        message: { err: `ERROR in resourceController.subtractLike  ${err}` },
      })
  })
};
module.exports = resourceController;
