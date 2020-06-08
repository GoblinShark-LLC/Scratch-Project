const { Pool } = require('pg');
// link to resources database on elephantSQL
const PG_URI =
  'postgres://ondxptpk:A2iAcCDwhK8u_DJk6tkB9H5SEHLCbjRk@ruby.db.elephantsql.com:5432/ondxptpk';
const pool = new Pool({
  connectionString: PG_URI,
});

// query handler => allows you to query from the database.
// Connects all queries written in controller to our remote database in elephantSQL
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
