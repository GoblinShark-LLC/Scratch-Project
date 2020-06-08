const db = require('./../models/resourceModels');

// Initialize controller object
const resourceController = {};

let item = '';
// Get all resources from the db based on tech
resourceController.getResources = (req, res, next) => {
  let tech_name = req.body.tech || req.params.name;
  console.log('In the get getresources      ', tech_name);
  item = `SELECT resources._id, resources.name, resources.url, resources.likes, resources.description, resources.tech_id, resources.liked, techs.tech FROM resources, techs WHERE techs.tech = $1 and techs._id = resources.tech_id order by likes DESC;`;
  const values = [tech_name];
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

// Get's the tech id (from post tech name in the request body) to be used in adding a resource
resourceController.getTechId = (req, res, next) => {
  console.log('Im in the techid', req.body.tech);
  let tech = req.body.tech || res.locals.resourceById.tech;
  item = `SELECT _id FROM techs WHERE tech = $1`;
  const values = [tech];
  db.query(item, values)
    .then((query) => {
      // Get just the number value from our rows
      res.locals.techId = query.rows[0]._id;
      return next();
    })
    .catch((err) =>
      next({
        log: 'ERROR IN resourceControllers.getTechId',
        message: { err: `ERROR in getTechId ${err}` },
      })
    );
};

// Creates a new resource by combining a tech id and the request body info
resourceController.addResource = (req, res, next) => {
  let techId = res.locals.techId;
  let { name, description, url } = req.body;
  item = `INSERT INTO resources (name, description, url, likes, tech_id, liked)
    VALUES ($1, $2, $3, 0, $4, false);`;
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
  let resourceId = req.body.id;
  console.log('This is your resource id     ', resourceId);
  // Increase like count by 1 for a resource(id)
  item = `UPDATE resources SET likes = likes + 1, liked = true WHERE _id = $1`;
  const values = [resourceId];
  db.query(item, values)
    .then(() => {
      return next();
    })
    .catch((err) =>
      next({
        log: 'ERROR in resourceControllers.addLike',
        message: { err: `ERROR in addLike ${err}` },
      })
    );
};

// Decrease the like count of a resource by one
resourceController.subtractLike = (req, res, next) => {
  let resourceId = req.body.id;
  // Decrease like count by 1 for a resource(id) if the likes > 0
  item = `UPDATE resources SET likes = likes - 1 , liked = false WHERE _id = $1 and likes > 0`;
  const values = [resourceId];
  db.query(item, values)
    .then(() => {
      return next();
    })
    .catch((err) =>
      next({
        log: 'ERROR in resourceControllers.subtractLike',
        message: { err: `ERROR in subtractLike ${err}` },
      })
    );
};

module.exports = resourceController;
