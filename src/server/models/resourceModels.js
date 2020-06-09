const { Pool } = require('pg');
// Link to resources database on elephantSQL
const PG_URI =
  'postgres://ondxptpk:A2iAcCDwhK8u_DJk6tkB9H5SEHLCbjRk@ruby.db.elephantsql.com:5432/ondxptpk';

const pool = new Pool({
  connectionString: PG_URI,
});

// TWO TABLES IN DATABASE:
// [PK] = Primary Key [FK] = Foreign Key
// RESOURCES TABLE: Lists data about each resource
////  Column names w/ data_type : 
//////    (_id [PK] : auto-generated, name : string, description : text, url : string, likes : int, tech_id[FK] : int, liked : boolean)
// TECHS TABLE: Lists each individual tech (i.e. react, redux, jest) and their unique id
////   Column names : (_id [PK] : auto-generated, tech : string [lowercase])



// Query handler => allows you to query from the database.
// Connects all queries written in controller to our remote database in elephantSQL
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
