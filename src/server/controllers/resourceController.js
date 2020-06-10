const db = require('./../models/resourceModels');

// Initialize controller object
const resourceController = {};

let item = '';
// Get all resources from the db based on tech name
resourceController.getResources = (req, res, next) => {
  // Tech name can be received one of two ways, depending on where the middleware is called
  let tech_name = req.body.tech || req.params.name;
  // alternate way of writing this query => 'SELECT * FROM tech JOIN resources ON resources.tech_id = tech._id WHERE tech = $1 ORDER BY likes DESC'
  item = `SELECT r.resources_id, r.name, r.description, r.url, r.likes, r.tech_id, t.tech FROM resources r, techs t WHERE t.tech = $1 and t.techs_id = r.tech_id order by likes DESC;`;
  const values = [tech_name];
  db.query(item, values)
    .then((query) => {
      //console.log('query.rows for getResources ->', query.rows);
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

// fetch from techs table all tech topics as an array and put it into res.locals.topics
resourceController.getTopics = (req, res, next) => {
  item = `SELECT techs.tech FROM techs`;
  db.query(item)
    .then((query) => {
      //console.log('Query.rows for getTopics', query.rows);
      const topics = query.rows.map((techObject) => techObject.tech);
      //console.log('topics array in getTopics controller should be ', topics);
      res.locals.topics = topics;
      return next();
    })
    .catch((err) =>
      next({
        log: 'ERROR in resourceControllers.getTopics',
        message: { err: `ERROR in getTopics ${err}` },
      })
    );
};

// Get's the tech id (from post tech name in the request body) to be used in adding a resource
resourceController.getTechId = (req, res, next) => {
  // console.log('Im in the techid', req.body.tech);
  // Tech is the tech name associated with a resource: can be obtained via the body or by locals
  let tech = req.body.tech;
  // || res.locals.resourceById.tech;
  item = `SELECT techs_id FROM techs WHERE tech = $1`;
  const values = [tech];
  db.query(item, values)
    .then((query) => {
      // Get just the number value from our rows
      // console.log('query.rows -> ', query.rows[0]);
      res.locals.techId = query.rows[0].techs_id;
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
  item = `INSERT INTO resources (name, description, url, likes, tech_id)
    VALUES ($1, $2, $3, 0, $4);`;
  // prevents sql injection
  const values = [name, description, url, techId];
  db.query(item, values)
    .then((query) => {
      res.locals.resources = query.rows;
      return next();
    })
    .catch((err) =>
      next({
        log: 'ERROR in resourceControllers.addResources',
        message: { err: `ERROR in addResources ${err}` },
      })
    );
};

// Increase the like count of a resource by one
resourceController.addLike = (req, res, next) => {
  let resourceId = req.body.id;
  console.log('This is your resource id     ', resourceId);
  // Increase like count by 1 for a resource(_id)
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
