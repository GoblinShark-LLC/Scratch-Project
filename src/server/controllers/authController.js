// const db = require('./../models/resourceModels'); //???
// // need to implement bCrypt
// // need to implement cookies
// // need to implement sessions

// const authController = {};

// authController.getVerification = (req, res, next) => {
//   const { username, password } = req.body;
//   const values = [username];
//   // ask users table name
//   // ask account_name colunm name
//   const queryText = `
//     SELECT * from users WHERE account_name = $1;
//   `;

//   db.query(queryText, values)
//     .then(data => {

//       const dbUser = data.rows[0]
//       console.log(dbUser);
//       // check password make this more secure later with bcrypt
//       if (dbUser.password === password) {
//         res.locals.user = {
//           account_name: dbUser.account_name,
//           _id: dbUser._id,
//         };
//         return next();
//       }

//       return next({
//         log: 'Error in authController.getVerification',
//         status: 400,
//         message: 'password did not match',
//       })

//     }).catch(err => next({
//       log: 'Error in authController.getVerification',
//       status: 400,
//       message: err,
//     }));
// }

// authController.getUserInformation = (req, res, next) => {
//   let username = req.params;
//   // some query expretion
//   // user = `SELECT ....;`;
//   const values = [username];
//   db.query(user, values)
//     .then((query) => {
//       res.locals.userInformation = query.rows;
//       return next();
//     })
//     .catch((err) =>
//       next({
//         log: 'ERROR in authControllers.getUserInformation',
//         message: { err: `ERROR in getUserInformation ${err}` },
//       })
//     );
// };

// authController.postUserInformation = (req, res, next) => {
//   // ask users table name
//   // ask account_name colunm name
//   const queryText = `
//   INSERT INTO users (account_name, password)
//   VALUES ($1, $2)
//   RETURNING _id
// `
// const { username, password } = req.body;
// const values = [username, password];

// db.query(queryText, values)
//   .then(data => {
//     res.locals.userInformation = data.rows[0]
//     return next();
//   })
//   .catch(err => next({
//     log: 'Error in authController.postUserInformation',
//     status: 400,
//     message: err,
//   }));
// }

// module.exports = authController;
