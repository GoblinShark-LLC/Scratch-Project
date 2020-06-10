const { Pool } = require('pg');
// Link to resources database on elephantSQL
const PG_URI =
  // 'postgres://ondxptpk:A2iAcCDwhK8u_DJk6tkB9H5SEHLCbjRk@ruby.db.elephantsql.com:5432/ondxptpk';
  `	postgres://slbtcpev:LYK3KUB_Fn-7f5Z5cyQ0Q8CfJwtGKgRb@ruby.db.elephantsql.com:5432/slbtcpev`;
const pool = new Pool({
  connectionString: PG_URI,
});

// TWO TABLES IN DATABASE:
// [PK] = Primary Key [FK] = Foreign Key
// RESOURCES TABLE: Lists data about each resource
////  Column names w/ data_type :

//(_id [PK] : auto-generated,
// name : string,
//  description : text,
//   url : string,
//   likes : int,
//    tech_id[FK] : int,
//    liked : boolean)

// TECHS TABLE: Lists each individual tech (i.e. react, redux, jest) and their unique id
////   Column names : (_id [PK] : auto-generated, tech : string [lowercase])

// INSERT RESOURCES

/*
CREATE TABLE resources (
	resources_id serial PRIMARY KEY,
	name VARCHAR (100) UNIQUE NOT NULL, 
	description VARCHAR NOT NULL,
	url VARCHAR UNIQUE NOT NULL,
	likes INT,
  tech_id INT, 
  FOREIGN KEY (resources_id) REFERENCES tech(_id)
);

CREATE TABLE techs (
  techs_id serial PRIMARY KEY,
  tech VARCHAR (50)
);

CREATE TABLE users (
users_id serial PRIMARY KEY,
email VARCHAR UNIQUE NOT NULL,
password VARCHAR NOT NULL,
favorites INT,
FOREIGN KEY (favorites) REFERENCES favorites(_id)
);

CREATE TABLE favorites (
favorites_id serial PRIMARY KEY,
users_id INT,
resources_id INT
FOREIGN KEY (user_id) REFERENCES users(users_id),
FOREIGN KEY (resource_id) REFERENCES resources(resources_id)
);


CREATE TABLE upvotes (
  upvotes_id serial PRIMARY KEY,
  users_id INT,
  resources_id INT,
  FOREIGN KEY (users_id) REFERENCES users(users_id),
  FOREIGN KEY (resources_id) REFERENCES resources(resources_id)
);

CREATE TABLE downvotes (
  downvotes_id serial PRIMARY KEY,
  users_id FOREIGN KEY,
  resources_id INT,
  FOREIGN KEY (users_id) REFERENCES users(users_id),
  FOREIGN KEY (resources_id) REFERENCES resources(resources_id)
);

*/

// Query handler => allows you to query from the database.
// Connects all queries written in controller to our remote database in elephantSQL
module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
