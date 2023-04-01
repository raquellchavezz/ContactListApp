const { Pool } = require("pg"); //imports the Pool class from the pg module, which is a popular PostgreSQL client library for Node.js.
//{} here mean we're doing object destructuring --> lets us get a certain property from 'pg' module and assign it to a constant variable with the same name 'Pool'

const db = new Pool({
  //creates a new Pool instance and assigns it to a constant variable named db
  connectionString: process.env.DB_URI, // connection URI that points to the PostgreSQL server.
});

module.exports = db; // makes the db object available for use in other modules that require this one, allowing them to perform database operations using
//the same connection pool.

//code exports a PostgreSQL database connection pool object from a Node.js module.
