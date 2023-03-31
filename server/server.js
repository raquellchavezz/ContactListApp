const express = require("express"); //allows us to use express
//This line imports the Express.js module into the file and assigns it to a variable called express.
//Express is a popular web framework for Node.js that provides a set of tools and features for building web applications and APIs.
//Express.js is a node.js framework that will allow us to do our HTTP request.
//Additionally, Express.js allows us to manage our routes (endpoint that url will go to), and make our web server.
//A web server is a software program that serves web content to clients upon request over the internet.
const cors = require("cors"); //security
//imports the cors module into the file. cors stands for Cross-Origin Resource Sharing
//it is a security feature that restricts access to resources on a web page to only the domains that are explicitly allowed-- refers to a list of domain names or IP addresses that are allowed to access a web resource (such as an API endpoint or a web page) from another domain.
// The cors module is used to configure the Express.js app to enable cross-origin requests from specific origins.

require("dotenv").config(); // loads the dotenv module and configures environment variables for the application.
const path = require("path"); // loads the built-in path module in Node.js and assigns it to a variable path.

const db = require("./db/db-connection.js"); //connects to our
// imports a module named db-connection.js from a subdirectory called db.
//require function in Node.js is used to load a module into a program, and it returns an object that represents the exported values of the module
//db-connection.js exports a value that represents a connection to a database.
// By importing this module using require, the value is assigned to a constant variable named db, which can then be used to perform operations on the database.

const app = express();
// the express() function is used to create a new instance of the Express application, which is stored in the app constant.
//express() function is the key part of the Express framework that creates a web server in a Node.js application.
const PORT = process.env.PORT || 8080;
//assigns the value of the PORT environment variable to a variable named PORT, or a default value of 8080 if the PORT environment variable is not defined.
app.use(cors());
//By calling cors() as middleware for the Express application using app.use(cors()), the application is allowed to make requests to other domains or origins.
//CORS is a security mechanism that allows a web page from one domain or origin to access resources from another domain or origin.
//Without CORS, web browsers(google chrome) would prevent a web page (like jarian cafe's web page)from making requests to a different domain, in order to prevent malicious behavior.
app.use(express.json());
// both lines of code in Node.js that configure middleware for an Express application.

// creates an endpoint for the route "/""
app.get("/", (req, res) => {
  // the / is implicit so really we are doing this: http://localhost:8080/
  res.json({ message: "Hola, from My template ExpressJS with React-Vite" });
});
//res = response, res.json() method is used to send a JSON response to the client, which in this case is an object with a single property message set to the string

// create the get request for contacts in the endpoint '/api/contacts'
app.get("/api/contacts", async (req, res) => {
  //this endpoint/route matches line 17 in ListContacts.jsx
  //a route for express.js app that listens for GET requests to the /api/contacts endpoint
  //we've basically created an endpoint for the front end
  //front end will send a http request to the backend and the http request's url should contain /api/contacts
  //since these match, the backend willl know what the front end is requesting and here is where we do the logic
  try {
    //when front end makes a request to the server here w matching url endpoint, server will execuute code inside
    const { rows: contacts } = await db.query("SELECT * FROM contacts");
    // const dbResponse = await db.query("SELECT * FROM contacts"); //holds response of query
    // const contacts = dbResponse.rows;
    // console.log(JSON.stringify(dbResponse, null, "  "));

    //code is making a query to a database (using db.query()) to retrieve all the records from the "contacts" table
    //object destructuring
    //gets the "rows" property from the result of the database query & assigns it to variable called contacts
    // console.log("Trying to list all contacts from query ", contacts);
    //when do a select statement it returns a result set that has one or more rows of data
    //each row is an entity in the db
    //the rows property is an array of objects, where each object in the array represents a row in the result set.
    res.send(contacts); //now I got the records from contacts and i want to send this info back to front end
    //then sends the retrieved records (i.e., contacts) as a response back to the client using the res.send() method.
  } catch (e) {
    return res.status(400).json({ e });
  }
});

// create the POST request endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const newContact = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phonenumber: req.body.phonenumber,
      email: req.body.email,
    };
    //console.log([newStudent.firstname, newStudent.lastname, newStudent.iscurrent]);
    const result = await db.query(
      "INSERT INTO contacts(firstname, lastname, phonenumber,email) VALUES($1, $2, $3, $4) RETURNING *",
      [
        newContact.firstname,
        newContact.lastname,
        newContact.phonenumber,
        newContact.email,
      ]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// delete request for contaacts
app.delete("/api/contacts/:contactId", async (req, res) => {
  try {
    const contactId = req.params.contactId; //this grabs the unique identifier from the url aboove in the placeholder
    await db.query("DELETE FROM contacts WHERE id_contact=$1", [contactId]);
    console.log("From the delete request-url", contactId);
    res.status(200).end();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

//A put request - Update a contact
app.put("/api/edit/contact/:contactId", async (req, res) => {
  console.log("HELLO", req.params); //this works now
  console.log(req.body);
  //This will be the id that I want to find in the DB - the student to be updated
  //   const contactId = req.params.contactId;//not getting this
  const updatedContact = {
    id_contact: req.body.id_contact,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phonenumber: req.body.phonenumber,
    email: req.body.email,
  };
  //   console.log("In the server from the url - the contact id", contactId);
  console.log(
    "In the server, from the react - the contact to be edited",
    updatedContact
  );
  // UPDATE contacts SET lastname = "something" WHERE id="16";
  const query = `UPDATE contacts SET firstname=$1, lastname=$2, phonenumber=$3,  email=$4 WHERE id_contact=${updatedContact.id_contact} RETURNING *`;
  const values = [
    updatedContact.firstname,
    updatedContact.lastname,
    updatedContact.phonenumber,
    updatedContact.email,
  ];
  try {
    const updated = await db.query(query, values);
    console.log(updated.rows[0]);
    res.send(updated.rows[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ e });
  }
});

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Hola, Server listening on ${PORT}`);
});
