const db = require('./../models/resourceModels');

// Initialize controller object
const resourceController = {};

let item = '';
// Get all resources from the db based on tech name, fired when user presses sideNav button
resourceController.getResources = (req, res, next) => {
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
      console.log('this is what query.rows comes back as: ', query.rows); 
      return next();
    })
    .catch((err) =>
      next({
        log: 'ERROR in resourceControllers.getResources',
        message: { err: `ERROR in getResources ${err}` },
      })
    );
};

// // Get's the tech id (from post tech name in the request body) to be used in adding a resource
// resourceController.getTechId = (req, res, next) => {
//   // console.log('Im in the techid', req.body.tech);
//   // Tech is the tech name associated with a resource: can be obtained via the body or by locals
//   let tech = req.body.tech || res.locals.resourceById.tech;
//   item = `SELECT _id FROM techs WHERE tech = $1`;
//   const values = [tech];
//   db.query(item, values)
//     .then((query) => {
//       // Get just the number value from our rows
//       res.locals.techId = query.rows[0]._id;
//       return next();
//     })
//     .catch((err) =>
//       next({
//         log: 'ERROR IN resourceControllers.getTechId',
//         message: { err: `ERROR in getTechId ${err}` },
//       })
//     );
// };

// Creates a new resource by combining a tech id and the request body info
resourceController.addResource = (req, res, next) => {
  let techId = res.locals.techId;
  let { name, description, url } = req.body;
  item = `INSERT INTO resources (name, description, url, likes, tech_id, liked)
    VALUES ($1, $2, $3, 0, $4, false);`;
  // prevents sql injection
  const values = [name, description, url, techId];
  db.query(item, values)
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
  const subLikes = `UPDATE resources 
                    SET likes = likes - 1 
                    WHERE _id = $1;`

  const values = [resourceId, userId];

  
  // For transactions in node-postgres, must do each command in transaction as separate queries
  db.query('BEGIN;')
    .then(db.query(deleteFromLikesTable, values))
    .then(db.query(subLikes, [resourceId]))
    .then(db.query('COMMIT;'))
    .then(() => next())
    .catch(err => {
      return next({
        log: 'ERROR in resourceController.subtractLike',
        message: { err: `ERROR in resourceController.subtractLike  ${err}` },
      })
  })
};

// !!!!!!!!!!!! FINISH THIS !!!!!!!!!!!!!!!
// Decrease the like count of a resource by one
resourceController.addDislike = (req, res, next) => {
  // capture resourceId and userId from req.params
  const { resourceId, userId } = req.params;

  // Adding new like to likes table, incrementing likes count in resources by one

  // add user's like to the Likes table
  const deleteFromLikesTable = `DELETE FROM likes 
                                WHERE resource_id = $1
                                AND user_id = $2;` 

  // increments current like count on resource
  const subLikes = `UPDATE resources 
                    SET likes = likes - 1 
                    WHERE _id = $1;`

  const values = [resourceId, userId];

  
  // For transactions in node-postgres, must do each command in transaction as separate queries
  db.query('BEGIN;')
    .then(db.query(deleteFromLikesTable, values))
    .then(db.query(subLikes, [resourceId]))
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
