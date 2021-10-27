require("dotenv").config();
const { Client } = require("pg");
const { DB_PASS, DB_PORT } = process.env;
//console.log(SERVER_PORT);

const CONNECTION_STRING = {
  host: "localhost",
  user: "postgres",
  port: DB_PORT,
  password: DB_PASS,
  database: "graceshopper",
};

const client = new Client(CONNECTION_STRING);
module.exports = client;
